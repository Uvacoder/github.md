import { ButtonLink } from '@/components';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SignInPage: React.FC = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status]);

  return (
    <div className="h-full w-full grid place-content-center gap-10 mt-[10vh]">
      <h1 className="dark:text-stone-100 text-2xl text-center">
        Sign in to <code>blog.md</code> using Github account
      </h1>
      <ButtonLink
        size="big"
        onClick={() =>
          signIn('github', {
            callbackUrl: '/gh',
          })
        }
        text="Sign in with Github"
      />
      <div>
        <h2 className="text-xl dark:text-stone-300 text-center mb-4">
          You can also browse any Github repository without an account
        </h2>
        <Link href="/gh">
          <div className="underline text-accent dark:text-accent-dark text-center cursor-pointer mx-auto text-xl">
            Find repository
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
