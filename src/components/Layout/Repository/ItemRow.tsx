import Link from 'next/link';
import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  children?: React.ReactNode;
  href?: string;
  title?: string;
  className?: string;
  icon?: IconProp;
}

const ItemRow: React.FC<IProps> = ({
  children,
  href = '/',
  icon = faAlignLeft,
  className,
  title,
}) => {
  return (
    <Link href={href}>
      <div className={`w-full cursor-pointer ${className}`}>
        <div className="flex items-center">
          <FontAwesomeIcon className="mr-2 w-[1rem] h-[1rem]" icon={icon} />
          <div>{title}</div>
        </div>
        {children}
      </div>
    </Link>
  );
};

export default ItemRow;
