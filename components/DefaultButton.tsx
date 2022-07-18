import React from 'react';

interface IProps {
  children?: React.ReactNode;
  size?: 'default' | 'big';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const DefaultButton: React.FC<IProps> = ({
  children,
  onClick,
  size = 'default',
}) => {
  const styles = {
    default: 'px-4 py-1.5 min-w-[120px]',
    big: 'px-5 py-4 min-w-[150px]',
  };
  return (
    <button
      onClick={onClick}
      className={
        'transition flex mx-auto bg-stone-200 text-[#222] rounded-[10px] items-center justify-center cursor-pointer w-fit ' +
        styles[size]
      }
    >
      {children}
    </button>
  );
};

export default DefaultButton;
