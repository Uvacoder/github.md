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
