import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ButtonLink from './ButtonLink';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const ThemeToggle = dynamic(() => import('../components/ThemeToggle'), {
  ssr: false,
});

const Header: React.FC = () => {
  const { data: session } = useSession();
  return (
    <header
      className="bg-primary-light dark:bg-primary-dark container px-4 sm:p-0 mx-auto h-[60px] flex justify-between 
    items-center border-b border-stone-500 dark:border-stone-500 sticky top-0 z-10 text-normal-light dark:text-stone-200 transition-colors"
    >
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <FontAwesomeIcon
            className="mr-2 w-[3rem] h-[3rem] "
            icon={faMarkdown}
          />
          <span className="text-2xl hidden sm:block">blog.md</span>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <ButtonLink link={{ href: '/gh' }}>
          <div className="flex gap-2 items-center">
            {session ? (
              <Image
                src={session.user.image}
                width="20px"
                height="20px"
                className="rounded-full"
              />
            ) : (
              <FontAwesomeIcon className="w-[20px] h-[20px]" icon={faGithub} />
            )}
            <div>Create blog</div>
          </div>
        </ButtonLink>
      </div>
    </header>
  );
};

export default Header;
