import React, { useContext } from "react";

import PostRow from "./PostRow";

import { IFolderTree } from "@/types";
import { getFileFromPath, removeFileFromPath } from "@/utils";
import { RepoContext } from "./layout/RepoLayout";

const FilesList: React.FC<{ tree: IFolderTree[] }> = ({ tree }) => {
  const { owner, branch, name, curPath = "" } = useContext(RepoContext);
  return (
    <div className="grid gap-10">
      {tree.length === 0 ? (
        <div>No markdown files in this project</div>
      ) : (
        tree
          ?.filter(
            ({ path }) =>
              curPath === "/" || curPath === removeFileFromPath(path)
          )
          .map(({ path, url, size }) => (
            <div key={url}>
              <PostRow
                href={`/gh/${owner}/${name}/${branch}/${path}`}
                title={getFileFromPath(path)}
                size={size}
              />
            </div>
          ))
      )}
    </div>
  );
};

export default FilesList;
