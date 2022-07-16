import React from 'react';
import ItemRow from './ItemRow';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { calcReadingTime } from '@/utils';

interface IProps {
  title: string;
  href?: string;
  size: number;
}

const PostRow: React.FC<IProps> = ({ title, href, size = 100 }) => {
  return (
    <ItemRow href={href} icon={faAlignLeft} title={title} className="text-xl">
      <div className="flex items-center">
        <FontAwesomeIcon
          className="mr-2 w-[0.6rem] h-[0.6rem]"
          icon={faClock}
        />
        <div className="text-sm text-[#ccc]">{`${calcReadingTime(
          size
        )} min read`}</div>
      </div>
    </ItemRow>
  );
};

export default PostRow;
