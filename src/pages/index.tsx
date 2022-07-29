import { ButtonLink } from '@/components';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>repo.md</title>
        <meta name="description" content="repo.md" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid items-center text-center py-4 place-content-center dark:text-stone-400">
        <Title />
        <SubTitle />
        <SelectProject />
        <BuiltWith />
      </main>
    </>
  );
};

export default Home;

const Title: React.FC = () => {
  return (
    <h1 className="text-3xl mb-4 dark:text-stone-100">
      A place for your markdown projects.
    </h1>
  );
};

const SubTitle: React.FC = () => {
  return <h2 className="text-xl">View your Github project as a blog.</h2>;
};

const SelectProject: React.FC = () => {
  return (
    <div className="flex mx-auto items-center my-20">
      <ButtonLink size="big" link={{ href: '/gh' }}>
        Select a project
      </ButtonLink>
    </div>
  );
};

const BuiltWith: React.FC = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text mb-6">🔨 Built with NextJS, TypeScript, Tailwind.</h2>
      <h2 className="text mb-6">🧪 Tested with Jest, RTL.</h2>
      <div className="grid gap-4 sm:flex mx-auto items-center">
        <h2 className="text-xl dark:text-stone-200">Check out our Github</h2>
        <ButtonLink
          text="Visit our repo"
          link={{ href: 'https://github.com/ilyasudakov', newTab: true }}
        />
      </div>
    </div>
  );
};
