import Link from 'next/link';
import React, { useContext } from 'react';
import { RepoContext } from '@/contexts';
import ButtonLink from '../ButtonLink';
import UserSmall from '../UserSmall';

const InfoPanel: React.FC = () => {
  const { repoInfo } = useContext(RepoContext);

  return (
    <div className="border border-stone-500 dark:border-[#aaa] min-h-[50px] rounded-[10px] py-4 px-6 gap-2 grid w-full justify-center items-center">
      <Link href={`/gh/${repoInfo.owner.login}`}>
        <div className="mx-auto">
          <UserSmall owner={repoInfo.owner} />
        </div>
      </Link>
      <div className="mb-4">{repoInfo.description}</div>
      <ButtonLink
        text="View on Github"
        link={{ href: repoInfo.html_url, newTab: true }}
      />
    </div>
  );
};

export default InfoPanel;
