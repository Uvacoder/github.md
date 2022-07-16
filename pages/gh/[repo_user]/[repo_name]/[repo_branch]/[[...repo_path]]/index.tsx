import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { FilesList, RepoLayout } from '@/components';
import { IFolderTree, IRepoInfo, IRepoParams } from '@/typescript/types';
import {
  loadMarkdownFileIsomorphic,
  loadRepoInfo,
  loadRepoStructure,
} from '@/utils';

const RepoPage: React.FC<{
  tree: IFolderTree[];
  params: IRepoParams;
  file: string;
  info: IRepoInfo;
}> = ({ tree, params, file, info }) => {
  return (
    <RepoLayout tree={tree} params={params} file={file} info={info}>
      {params.repo_path?.join('/').includes('.md') ? (
        <>
          <div
            className="prose prose-invert"
            dangerouslySetInnerHTML={{ __html: file }}
          ></div>
        </>
      ) : (
        <FilesList tree={tree} />
      )}
    </RepoLayout>
  );
};

export default RepoPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params: IRepoParams = context.params || {};
  const tree = await loadRepoStructure(params);
  const info = await loadRepoInfo(params);
  if (params?.repo_path?.join('/').includes('.md')) {
    const file = await loadMarkdownFileIsomorphic(params);
    return { props: { tree, params, file, info } };
  }
  return { props: { tree, params, info } };
}
