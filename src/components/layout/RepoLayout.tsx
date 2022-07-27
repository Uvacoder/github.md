import React from "react";

import Sidepanel from "./sidepanel/Sidepanel";

import { IFolderTree, IRepoInfo, IRepoParams } from "@/types";
import { findMarkdownFiles, removeFileFromPath } from "@/utils";

export const FoldersContext = React.createContext<{
  folders: { path: string; active: boolean }[];
}>({ folders: [] });

export const RepoContext = React.createContext<{
  owner: string;
  name: string;
  branch: string;
  curPath?: string;
  repoInfo: IRepoInfo;
}>({
  owner: "",
  name: "",
  branch: "",
  curPath: "",
  repoInfo: {
    id: 1,
    name: "",
    full_name: "",
    owner: { avatar_url: "", login: "" },
    html_url: "",
    description: "",
  },
});

const getUniqueFolders = (tree: IFolderTree[], cur_path: string) => {
  const uniqueFolders: any = {};
  tree.map(({ path }) => {
    const _folders: string[] = path.split("/");
    _folders.pop();
    let cur_unique_path = "";
    _folders.map((folder) => {
      cur_unique_path =
        cur_unique_path === "" ? folder : cur_unique_path + "/" + folder;
      uniqueFolders[cur_unique_path] = true;
    });
  });
  return Object.keys(uniqueFolders).map((value) => ({
    path: value,
    active: value === cur_path,
  }));
};

const RepoLayout: React.FC<{
  tree: IFolderTree[];
  params: IRepoParams;
  file?: string;
  children?: React.ReactNode;
  info: IRepoInfo;
}> = ({ tree, params, children, info }) => {
  const getOnlyFolders = (tree: IFolderTree[], path: string[] = []) => {
    let _files = findMarkdownFiles(tree, params);
    const cur_path = removeFileFromPath([...path]);
    _files = _files
      .filter(({ path }) => path.includes("/"))
      .map((item) => {
        const _path = removeFileFromPath(item.path);
        return {
          ...item,
          active: cur_path === _path ? true : false,
        };
      });
    return getUniqueFolders(_files, cur_path || "");
  };

  return (
    <RepoContext.Provider
      value={{
        owner: params.repo_user || "",
        name: params.repo_name || "",
        branch: params.repo_branch || "",
        curPath: params.repo_path?.join("/") ?? "/",
        repoInfo: info,
      }}
    >
      <div className="grid gap-4 lg:grid-cols-12 mx-auto w-full">
        <div className="lg:col-span-3">
          <FoldersContext.Provider
            value={{ folders: getOnlyFolders(tree, params?.repo_path ?? []) }}
          >
            <Sidepanel />
          </FoldersContext.Provider>
        </div>
        <div className="lg:col-span-9 mx-4">{children}</div>
      </div>
    </RepoContext.Provider>
  );
};

export default RepoLayout;
