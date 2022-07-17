import { ButtonLink, UserSmall } from '@/components';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';

const IntroPage: React.FC = () => {
  const { data: session } = useSession();
  const [username, setUsername] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (username === '') return;
    Router.push(`/gh/${username}`);
  };

  return (
    <div className="min-h-full grid gap-4 items-center text-center py-8">
      {session ? (
        <Link href={`/gh/${session.user?.login}`}>
          <div className="flex items-center mx-auto cursor-pointer">
            <div className="mr-4">View your projects</div>
            <UserSmall
              owner={{
                avatar_url: session.user?.image,
                login: session.user?.login,
              }}
            />
          </div>
        </Link>
      ) : (
        <ButtonLink onClick={() => signIn()} text="Sign in with Github" />
      )}
      <div className="my-8">or</div>
      <form className="flex justify-center">
        <input
          className="rounded-[5px] px-5 py-2 border bg-stone-900 border-[#666] mr-4 min-w-[300px]"
          type="text"
          name="username"
          id="username"
          placeholder="Github @username..."
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="text-stone-900 bg-white rounded-[5px] px-5 py-2 border border-[#aaa]"
        >
          🔎 Find user
        </button>
      </form>
    </div>
  );
};

export default IntroPage;
