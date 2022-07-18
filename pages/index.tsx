import { ButtonLink } from '@/components';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>blog.md</title>
        <meta name="description" content="blog.md" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid items-center text-center py-4 place-content-center dark:text-stone-400">
        <h1 className="text-3xl mb-4 dark:text-stone-100">
          A place for your markdown projects.
        </h1>
        <h2 className="text-xl">
          Blog for organizing markdown files using your Github repositories.
        </h2>
        <div className="flex mx-auto items-center my-20">
          <ButtonLink size="big" link={{ href: '/gh' }}>
            Select a project
          </ButtonLink>
        </div>
        <h2 className="text-xl mb-6">
          🔨 Built with NextJS, TypeScript, Tailwind
        </h2>
        <div className="grid gap-4 sm:flex mx-auto items-center">
          <h2 className="text-xl dark:text-stone-200">Check out our Github</h2>
          <ButtonLink
            text="Visit our repo"
            link={{ href: 'https://github.com/ilyasudakov', newTab: true }}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
