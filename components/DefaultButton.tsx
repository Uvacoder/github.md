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
    default:
      'flex mx-auto bg-white text-[#222] rounded-[10px] px-4 py-1 items-center cursor-pointer min-w-[120px] w-fit',
    big: 'flex mx-auto bg-white text-[#222] rounded-[10px] px-5 py-4 items-center cursor-pointer min-w-[150px] w-fit',
  };
  return (
    <button onClick={onClick} className={styles[size]}>
      {children}
    </button>
  );
};

export default DefaultButton;
