import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { PostRow, RepoLayout } from '../../../../../components';
import { loadRepoInfo, loadRepoStructure } from '../../../../../utils';
import {
  IFolderTree,
  IRepoInfo,
  IRepoParams,
} from '../../../../../typescript/types';

const RepoPage: React.FC<{
  tree: IFolderTree[];
  params: IRepoParams;
  info: IRepoInfo;
}> = ({ tree, params, info }) => {
  return (
    <RepoLayout tree={tree} params={params} info={info}>
      <div className="grid gap-10">
        {tree?.map(({ path, url, size }) => (
          <div key={url}>
            <PostRow
              href={`/gh/${params.repo_user}/${params.repo_name}/${params.repo_branch}/${path}`}
              title={path}
              size={size}
            />
          </div>
        ))}
      </div>
    </RepoLayout>
  );
};

export default RepoPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params: IRepoParams = context.params || {};
  const info = await loadRepoInfo(params);
  const tree = await loadRepoStructure(params);
  return { props: { tree, params, info } };
}
