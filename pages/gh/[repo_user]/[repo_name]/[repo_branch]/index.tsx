import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { PostRow, RepoLayout } from '../../../../../components';
import { loadRepoStructure } from '../../../../../utils';
import { IFolderTree, IRepoParams } from '../../../../../typescript/types';

const RepoPage: React.FC<{ tree: IFolderTree[]; params: IRepoParams }> = ({
  tree,
  params,
}) => {
  return (
    <RepoLayout tree={tree} params={params}>
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
  const tree = await loadRepoStructure(params);
  return { props: { tree, params } };
}
