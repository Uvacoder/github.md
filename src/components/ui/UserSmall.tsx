import Image from 'next/image';
import React from 'react';

const UserSmall: React.FC<{ owner: { avatar_url: string; login: string } }> = ({
  owner,
}) => {
  return (
    <div className="flex items-center cursor-pointer">
      <Image
        src={owner.avatar_url}
        width="30px"
        height="30px"
        className="rounded-full"
      />
      <div className="ml-2 dark:text-stone-200">@{owner.login}</div>
    </div>
  );
};

export default UserSmall;
