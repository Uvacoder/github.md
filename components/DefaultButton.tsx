import React from 'react';

interface IProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const DefaultButton: React.FC<IProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex mx-auto bg-white text-[#222] rounded-[10px] px-4 py-1 items-center cursor-pointer min-w-[120px] w-fit"
    >
      {children}
    </button>
  );
};

export default DefaultButton;
