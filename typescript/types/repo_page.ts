export interface IFolderTree {
  path: string;
  rawURL: string;
  url: string;
  size: number;
}

export interface IRepoParams {
  repo_user?: string;
  repo_name?: string;
  repo_branch?: string;
  repo_path?: string[];
}

export interface IRepoInfo {
  id: number;
  name: string;
  full_name: string;
  owner: { avatar_url: string; login: string };
  html_url: string;
  description: string;
}

export interface IUserRepos {
  owner: {
    login: string;
    avatar_url: string;
  };
  name: string;
  description: string;
}
