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
      <main className="grid items-center text-center py-4 place-content-center">
        <h1 className="text-2xl mb-4">A place for your markdown projects.</h1>
        <h2 className="text-xl text-stone-400 mb-4">
          Blog for organizing markdown files using your Github repositories.
        </h2>
        <div
          className={`w-auto max-w-full relative aspect-video border rounded border-stone-500 my-10`}
        >
          <Image src="/Screenshot.jpg" layout="fill" className="rounded" />
        </div>
        <div className="flex mx-auto items-center mb-10">
          <ButtonLink size="big" text="Select a project" href="/gh" />
        </div>
        <h2 className="text-xl text-stone-400 mb-6">
          🔨Built with NextJS, TypeScript, Tailwind
        </h2>
        <div className="flex mx-auto items-center">
          <h2 className="text-xl text-stone-200 mr-2">Check out our Github</h2>
          <ButtonLink
            text="Visit our repo"
            href="https://github.com/ilyasudakov"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
