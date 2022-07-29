import React, { useContext } from 'react';

import PostRow from './PostRow';

import { IFolderTree } from '@/types';
import { getFileFromPath, removeFileFromPath } from '@/utils';
import { RepoContext } from './RepoLayout';

const showCurFolderFiles = (files: IFolderTree[], curPath: string) => {
  return files.filter(
    ({ path }) => curPath === '/' || curPath === removeFileFromPath(path)
  );
};

const FilesList: React.FC<{ tree: IFolderTree[] }> = ({ tree }) => {
  const { owner, branch, name, curPath = '' } = useContext(RepoContext);

  return (
    <div className="grid gap-10">
      {tree.length === 0 ? (
        <EmptyProject />
      ) : (
        <List
          tree={showCurFolderFiles(tree, curPath)}
          getFilePath={(path: string) =>
            `/gh/${owner}/${name}/${branch}/${path}`
          }
        />
      )}
    </div>
  );
};

export default FilesList;

const EmptyProject = () => {
  return <div>No markdown files in this project</div>;
};

const List: React.FC<{ tree: IFolderTree[]; getFilePath: Function }> = ({
  tree,
  getFilePath,
}) => {
  return (
    <>
      {tree.map(({ path, url, size }) => (
        <div key={url}>
          <PostRow
            href={getFilePath(path)}
            title={getFileFromPath(path)}
            size={size}
          />
        </div>
      ))}
    </>
  );
};
