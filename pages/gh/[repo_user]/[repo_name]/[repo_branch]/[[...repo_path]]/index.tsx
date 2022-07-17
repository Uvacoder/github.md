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
  //redirect repos with 1 file only to that file
  if (tree.length === 1) {
    const path = tree[0].path;
    console.log(tree[0], path);
    const file = await loadMarkdownFileIsomorphic(params);
    context.res.setHeader(
      'location',
      `/gh/${params.repo_user}/${params.repo_name}/${params.repo_branch}/${path}`
    );
    context.res.statusCode = 302;
    context.res.end();
    return { props: { tree, params, info, file } };
  }
  if (params?.repo_path?.join('/').includes('.md')) {
    const file = await loadMarkdownFileIsomorphic(params);
    return { props: { tree, params, file, info } };
  }
  return { props: { tree, params, info } };
}
