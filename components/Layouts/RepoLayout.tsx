import React from 'react';
import { FoldersContext, RepoContext } from '@/contexts';
import { IFolderTree, IRepoInfo, IRepoParams } from '@/typescript/types';
import { findMarkdownFiles, removeFileFromPath } from '@/utils';
import Sidepanel from '../Sidepanel/Sidepanel';

const getUniqueFolders = (tree: IFolderTree[], cur_path: string) => {
  const uniqueFolders: any = {};
  tree.map(({ path }) => {
    const _folders: string[] = path.split('/');
    _folders.pop();
    let cur_unique_path = '';
    _folders.map((folder) => {
      cur_unique_path =
        cur_unique_path === '' ? folder : cur_unique_path + '/' + folder;
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
      .filter(({ path }) => path.includes('/'))
      .map((item) => {
        const _path = removeFileFromPath(item.path);
        return {
          ...item,
          active: cur_path === _path ? true : false,
        };
      });
    return getUniqueFolders(_files, cur_path || '');
  };

  return (
    <RepoContext.Provider
      value={{
        REPO_OWNER: params?.repo_user || '',
        REPO_NAME: params?.repo_name || '',
        REPO_BRANCH: params?.repo_branch || '',
        REPO_CUR_PATH: params?.repo_path?.join('/') ?? '/',
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
