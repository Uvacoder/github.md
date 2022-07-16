import { createContext } from 'react';
import { IRepoInfo } from '@/typescript/types';

const RepoContext = createContext<{
  REPO_OWNER: string;
  REPO_NAME: string;
  REPO_BRANCH: string;
  REPO_CUR_PATH?: string;
  repoInfo: IRepoInfo;
}>({
  REPO_OWNER: '',
  REPO_NAME: '',
  REPO_BRANCH: '',
  REPO_CUR_PATH: '',
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
