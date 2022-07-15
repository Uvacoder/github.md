import { createContext } from 'react';

const RepoContext = createContext<{
  REPO_OWNER: string;
  REPO_NAME: string;
  REPO_BRANCH: string;
  REPO_CUR_PATH?: string;
}>({
  REPO_OWNER: '',
  REPO_NAME: '',
  REPO_BRANCH: '',
  REPO_CUR_PATH: '',
});
export default RepoContext;
