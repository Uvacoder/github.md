import React, { useContext } from 'react';
import { GetServerSidePropsContext } from 'next';
import { PostRow, RepoLayout } from '../../../../../components';
import { IFolderTree, IRepoParams } from '../../../../../typescript/types';
import {
  getFileFromPath,
  loadMarkdownFileIsomorphic,
  loadRepoStructure,
  removeFileFromPath,
} from '../../../../../utils';
import { RepoContext } from '../../../../../contexts';

const RepoPage: React.FC<{
  tree: IFolderTree[];
  params: IRepoParams;
  file: string;
}> = ({ tree, params, file }) => {
  return (
    <RepoLayout tree={tree} params={params} file={file}>
      {params.repo_path?.join('/').includes('.md') ? (
        <div
          className="prose prose-invert"
          dangerouslySetInnerHTML={{ __html: file }}
        ></div>
      ) : (
        <FilesList tree={tree} />
      )}
    </RepoLayout>
  );
};

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
        ?.filter(({ path }) => REPO_CUR_PATH === removeFileFromPath(path))
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

export default RepoPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params: IRepoParams = context.params || {};
  const tree = await loadRepoStructure(params);
  if (params?.repo_path?.join('/').includes('.md')) {
    const file = await loadMarkdownFileIsomorphic(params);
    return { props: { tree, params, file } };
  }
  return { props: { tree, params } };
}
