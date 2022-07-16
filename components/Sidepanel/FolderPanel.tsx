import { faFolder, faHome } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import { FoldersContext, RepoContext } from '../../contexts';
import ItemRow from '../ItemRow';

const FolderPanel: React.FC = () => {
  const { folders } = useContext(FoldersContext);
  const { REPO_OWNER, REPO_NAME, REPO_BRANCH } = useContext(RepoContext);
  const rowStyles = {
    default: 'py-2 text-sm',
    active:
      'py-2 text-sm border rounded-[10px] border-[#aaa] px-3 w-fit ml-[-12px]',
  };

  return (
    <div className="border border-[#aaa] min-h-[50px] rounded-[10px] py-2 px-6 gap-2 grid pb-4">
      <ItemRow
        key={'/'}
        className="py-2 text-sm border rounded-[10px] border-[#aaa] px-3 w-fit mt-2 ml-[-12px]"
        href={`/gh/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}`}
        icon={faHome}
        title={'Home'}
      />
      {folders.map(({ path, active }) => (
        <ItemRow
          key={path}
          className={active ? rowStyles.active : rowStyles.default}
          href={`/gh/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/${path}`}
          icon={faFolder}
          title={path}
        />
      ))}
    </div>
  );
};

export default FolderPanel;
