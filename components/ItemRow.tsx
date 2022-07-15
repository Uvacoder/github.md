import Link from 'next/link';
import React from 'react';

const ItemRow: React.FC<{ children?: React.ReactNode; href: string }> = ({
  children,
  href,
}) => {
  return (
    <Link href={href}>
      <div className="w-full">{children}</div>
    </Link>
  );
};

export default ItemRow;
