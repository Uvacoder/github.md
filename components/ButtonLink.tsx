import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IProps {
  text?: string;
  href?: string;
  icon?: IconProp;
}

const ButtonLink: React.FC<IProps> = ({
  text = 'Click me',
  href = '',
  icon = faGithub,
}) => {
  return (
    <Link href={href}>
      <div className="flex bg-white text-[#222] rounded-[10px] px-4 py-1 items-center cursor-pointer min-w-[120px]">
        <FontAwesomeIcon className="mr-2 w-[20px] h-[20px]" icon={icon} />
        <div>{text}</div>
      </div>
    </Link>
  );
};

export default ButtonLink;
