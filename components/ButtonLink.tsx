import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import DefaultButton from './DefaultButton';

interface IProps {
  text?: string;
  href?: string;
  icon?: IconProp;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const ButtonLink: React.FC<IProps> = ({
  text = 'Click me',
  href = '',
  icon = faGithub,
  onClick,
  children,
}) => {
  return (
    <Link href={href}>
      <div>
        <DefaultButton onClick={onClick}>
          {children ?? (
            <>
              <FontAwesomeIcon className="mr-2 w-[20px] h-[20px]" icon={icon} />
              <div>{text}</div>
            </>
          )}
        </DefaultButton>
      </div>
    </Link>
  );
};

export default ButtonLink;
