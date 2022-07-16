import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { IRepoParams, IUserRepos } from '@/typescript/types';
import { loadUserInfo } from '@/utils';
import Link from 'next/link';
import { UserSmall } from '@/components';

const UserPage: React.FC<{ repos: IUserRepos[] }> = ({ repos }) => {
  return (
    <>
      {repos.length > 0 ? <UserSmall owner={repos[0].owner} /> : null}
      <div className="grid gap-6 mt-4">
        {repos.map((repo) => (
          <RepoRow repo={repo} />
        ))}
      </div>
    </>
  );
};

const RepoRow: React.FC<{ repo: IUserRepos }> = ({ repo }) => (
  <Link href={`/gh/${repo.owner.login}/${repo.name}/main`}>
    <div className="border border-[#bbb] py-2 pb-10 px-4 rounded-[10px] cursor-pointer">
      <div className="text-xl">{repo.name}</div>
      <div className="text-gray-400">{repo.description}</div>
    </div>
  </Link>
);

export default UserPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params: IRepoParams = context.params || {};
  const repos = await loadUserInfo(params?.repo_user || '');
  return { props: { repos } };
}
