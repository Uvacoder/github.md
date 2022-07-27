import React from 'react';
import FolderPanel from './FolderPanel';
import InfoPanel from './InfoPanel';

const Sidepanel: React.FC = () => {
  return (
    <div className="grid gap-4 sticky top-[calc(60px+1rem)]">
      <InfoPanel />
      <FolderPanel />
    </div>
  );
};

export default Sidepanel;
