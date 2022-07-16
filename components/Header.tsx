import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ButtonLink from './ButtonLink';

const Header: React.FC = () => {
  return (
    <header className="bg-[#202023] container mx-auto h-[60px] flex justify-between items-center border-b border-[#bbb] sticky top-0 z-10">
      <div className="flex items-center cursor-pointer">
        <FontAwesomeIcon className="mr-2 w-[3rem] h-[3rem]" icon={faMarkdown} />
        <span className="text-2xl">blog.md</span>
      </div>
      <div>
        <ButtonLink href={'/'} text={'Create your own blog'} icon={faGithub} />
      </div>
    </header>
  );
};

export default Header;
