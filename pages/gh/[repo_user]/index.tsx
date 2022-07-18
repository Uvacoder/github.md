import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { IRepoParams, IUserRepos } from '@/typescript/types';
import { loadUserInfo } from '@/utils';
import Link from 'next/link';
import { UserSmall } from '@/components';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

const UserPage: React.FC<{ repos: IUserRepos[] }> = ({ repos }) => {
  return (
    <>
      <Head>
        <title>
          {repos.length > 0 ? `@${repos[0].owner.login}` : 'Проекты'}
        </title>
        <meta
          name="description"
          content={repos.length > 0 ? `@${repos[0].owner.login}` : 'Проекты'}
        />
      </Head>
      {repos.length > 0 ? <UserSmall owner={repos[0].owner} /> : null}
      <div className="grid gap-6 mt-4 sm:grid-cols-2">
        {repos.map((repo) => (
          <RepoRow key={repo.name} repo={repo} />
        ))}
      </div>
    </>
  );
};

const RepoRow: React.FC<{ repo: IUserRepos }> = ({ repo }) => {
  return (
    <Link href={`/gh/${repo.owner.login}/${repo.name}/${repo.default_branch}`}>
      <div className=" transition-colors grid place-content-stretch border bg-stone-100 dark:bg-transparent border-stone-500 dark:border-stone-400 py-2 px-4 rounded-[10px] cursor-pointer">
        <div className="text-xl dark:text-gray-200">{repo.name}</div>
        <div className="dark:text-gray-400">{repo.description}</div>
        <div className="flex gap-2 items-end text-stone-500 dark:text-gray-400">
          <div className="text-sm mt-2">↪️{repo.default_branch}</div>
          {repo.stargazers_count > 0 && (
            <div className="text-sm mt-2">⭐{repo.stargazers_count}</div>
          )}
          {repo.forks_count > 0 && (
            <div className="text-sm mt-2">🔀{repo.forks_count}</div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default UserPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params: IRepoParams = context.params || {};
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=120'
  );
  const session = await getSession(context);
  const repos = await loadUserInfo(params?.repo_user || '', session);
  return { props: { repos } };
}
