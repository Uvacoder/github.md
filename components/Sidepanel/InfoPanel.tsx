import Link from 'next/link';
import React, { useContext } from 'react';
import { RepoContext } from '../../contexts';
import ButtonLink from '../ButtonLink';
import UserSmall from '../UserSmall';

const InfoPanel: React.FC = () => {
  const { repoInfo } = useContext(RepoContext);

  return (
    <div className="border border-[#aaa] min-h-[50px] rounded-[10px] py-4 px-6 gap-2 grid w-full justify-center items-center">
      <Link href={`/gh/${repoInfo.owner.login}`}>
        <UserSmall owner={repoInfo.owner} />
      </Link>
      <div className="mb-4">{repoInfo.description}</div>
      <ButtonLink text="View on Github" href={repoInfo.html_url} />
    </div>
  );
};

export default InfoPanel;
