import { createContext } from 'react';
import { IRepoInfo } from '@/types';

const RepoContext = createContext<{
  owner: string;
  name: string;
  branch: string;
  curPath?: string;
  repoInfo: IRepoInfo;
}>({
  owner: '',
  name: '',
  branch: '',
  curPath: '',
  repoInfo: {
    id: 1,
    name: '',
    full_name: '',
    owner: { avatar_url: '', login: '' },
    html_url: '',
    description: '',
  },
});
export default RepoContext;
