import axios from 'axios';
import { IFolderTree, IRepoParams } from '@/types';
import { Session } from 'next-auth';
import { getRawFileLocation } from '../helpers';

export const findMarkdownFiles = (
  tree: IFolderTree[],
  repo_info: IRepoParams = { repo_name: '', repo_user: '', repo_branch: '' }
) => {
  let markdownFiles: IFolderTree[] = [];
  tree.map((item) => {
    const { path } = item;
    if (path.match(/\.md/))
      markdownFiles.push({
        ...item,
        rawURL: getRawFileLocation(path, repo_info),
      });
  });
  return markdownFiles;
};

export const loadRepoStructure = (
  params: IRepoParams,
  session: Session | null
) => {
  return axios
    .get(
      `https://api.github.com/repos/${params?.repo_user}/${params?.repo_name}/git/trees/${params?.repo_branch}?recursive=true`,
      session
        ? {
            headers: { Authorization: `token ${session.accessToken}` },
          }
        : undefined
    )
    .then(({ data }) => {
      const { tree: _tree } = data;
      const markdownFiles = findMarkdownFiles(_tree, params);
      return markdownFiles;
    });
};

export const loadRepoInfo = (params: IRepoParams, session: Session | null) => {
  return axios
    .get(
      `https://api.github.com/repos/${params?.repo_user}/${params?.repo_name}`,
      session
        ? {
            headers: { Authorization: `token ${session.accessToken}` },
          }
        : undefined
    )
    .then(({ data }) => data);
};
