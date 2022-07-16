import React, { useContext } from 'react';
import { RepoContext } from '../contexts';
import { IFolderTree } from '../typescript/types';
import { getFileFromPath, removeFileFromPath } from '../utils';
import PostRow from './PostRow';

const FilesList: React.FC<{ tree: IFolderTree[] }> = ({ tree }) => {
  const {
    REPO_OWNER,
    REPO_BRANCH,
    REPO_NAME,
    REPO_CUR_PATH = '',
  } = useContext(RepoContext);
  return (
    <div className="grid gap-10">
      {tree
        ?.filter(
          ({ path }) =>
            REPO_CUR_PATH === '/' || REPO_CUR_PATH === removeFileFromPath(path)
        )
        .map(({ path, url, size }) => (
          <div key={url}>
            <PostRow
              href={`/gh/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/${path}`}
              title={getFileFromPath(path)}
              size={size}
            />
          </div>
        ))}
    </div>
  );
};

export default FilesList;
