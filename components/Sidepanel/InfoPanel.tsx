// import { faFolder, faHome } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import React, { useContext } from 'react';
import { RepoContext } from '../../contexts';
import ButtonLink from '../ButtonLink';

const InfoPanel: React.FC = () => {
  const { repoInfo } = useContext(RepoContext);

  return (
    <div className="border border-[#aaa] min-h-[50px] rounded-[10px] py-2 px-6 gap-2 grid w-full justify-center">
      <div className="flex items-center mx-auto">
        <Image
          src={repoInfo.owner.avatar_url}
          width="30px"
          height="30px"
          className="rounded-full"
        />
        <div className="ml-2">@{repoInfo.owner.login}</div>
      </div>
      <div className="mb-4">{repoInfo.description}</div>
      <ButtonLink text="View on Github" href={repoInfo.html_url} />
    </div>
  );
};

export default InfoPanel;
