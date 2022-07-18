import { ButtonLink } from '@/components';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const SignInPage: React.FC = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status]);

  return (
    <div className="h-full w-full grid place-content-center">
      <ButtonLink
        size="big"
        onClick={() =>
          signIn('github', {
            callbackUrl: '/gh',
          })
        }
        text="Sign in with Github"
      />
    </div>
  );
};

export default SignInPage;
