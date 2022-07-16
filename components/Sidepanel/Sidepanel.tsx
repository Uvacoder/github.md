import React from 'react';
import FolderPanel from './FolderPanel';
import InfoPanel from './InfoPanel';

const Sidepanel: React.FC = () => {
  return (
    <div className="grid gap-4">
      <InfoPanel />
      <FolderPanel />
    </div>
  );
};

export default Sidepanel;
