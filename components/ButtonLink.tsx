import React, { useMemo } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import DefaultButton from './DefaultButton';

interface IBasicProps {
  text?: string;
  icon?: IconProp;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  size?: 'default' | 'big';
}
interface IProps extends IBasicProps {
  link?: {
    href: string;
    newTab?: boolean;
  };
}

const ButtonLink: React.FC<IProps> = ({
  text = 'Click me',
  link,
  icon = faGithub,
  children,
  ...props
}) => {
  const getButton = useMemo(
    () => (
      <Button {...props} icon={icon} text={text}>
        {children}
      </Button>
    ),
    []
  );
  if (!link) {
    return getButton;
  }
  if (link.newTab) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer">
        {getButton}
      </a>
    );
  }
  return (
    <Link href={link.href} passHref>
      <div>{getButton}</div>
    </Link>
  );
};

export default ButtonLink;

const Button: React.FC<IBasicProps> = ({
  size,
  onClick,
  children,
  icon,
  text,
}) => {
  return (
    <DefaultButton size={size} onClick={onClick}>
      {children ?? (
        <>
          <FontAwesomeIcon className="mr-2 w-[20px] h-[20px]" icon={icon!} />
          <div>{text}</div>
        </>
      )}
    </DefaultButton>
  );
};
