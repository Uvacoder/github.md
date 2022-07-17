import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { IRepoParams, IUserRepos } from '@/typescript/types';
import { loadUserInfo } from '@/utils';
import Link from 'next/link';
import { UserSmall } from '@/components';
import { getSession } from 'next-auth/react';

const UserPage: React.FC<{ repos: IUserRepos[] }> = ({ repos }) => {
  return (
    <>
      {repos.length > 0 ? <UserSmall owner={repos[0].owner} /> : null}
      <div className="grid gap-6 mt-4 grid-cols-2">
        {repos.map((repo) => (
          <RepoRow key={repo.name} repo={repo} />
        ))}
      </div>
    </>
  );
};

const RepoRow: React.FC<{ repo: IUserRepos }> = ({ repo }) => {
  console.log(repo);

  return (
    <Link href={`/gh/${repo.owner.login}/${repo.name}/${repo.default_branch}`}>
      <div className="grid place-content-start border border-[#bbb] py-2 pb-10 px-4 rounded-[10px] cursor-pointer">
        <div className="text-xl">{repo.name}</div>
        <div className="text-gray-400">{repo.description}</div>
        <div className="flex gap-2 items-center">
          <div className="text-gray-400 text-sm mt-2">
            ↪️{repo.default_branch}
          </div>
          {repo.stargazers_count > 0 && (
            <div className="text-gray-400 text-sm mt-2">
              ⭐{repo.stargazers_count}
            </div>
          )}
          {repo.forks_count > 0 && (
            <div className="text-gray-400 text-sm mt-2">
              🔀{repo.forks_count}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default UserPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params: IRepoParams = context.params || {};
  const session = await getSession(context);
  const repos = await loadUserInfo(params?.repo_user || '', session);
  return { props: { repos } };
}
