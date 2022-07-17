import axios from 'axios';
import { sanitize } from 'isomorphic-dompurify';
import { marked } from 'marked';
import { IFolderTree, IRepoParams } from '@/typescript/types';
import { Session } from 'next-auth';

export const getMarkDownFile = async (url: string) => {
  return await axios
    .get(url, {
      headers: {
        // Authorization: process.env.GITHUB_AUTH_TOKEN, ??
        Accept: 'application/vnd.github+json',
      },
    })
    .then(({ data }) => data);
};

export const calcReadingTime = (size: number) => {
  const wpm = 180;
  const word_length = 5;
  const words = size / word_length;
  const words_time = words / wpm;
  const bonus = 1;
  return Math.floor(words_time + bonus);
};

export const findMarkdownFiles = (
  tree: IFolderTree[],
  repo_info: IRepoParams = { repo_name: '', repo_user: '', repo_branch: '' }
) => {
  let markdownFiles: IFolderTree[] = [];
  tree.map((item) => {
    const { path } = item;
    if (path.match(/\.md/))
      markdownFiles.push({ ...item, rawURL: getFileLocation(path, repo_info) });
  });
  return markdownFiles;
};

const getFileLocation = (filePath: string = '', repo_info: IRepoParams) => {
  return `https://raw.githubusercontent.com/${repo_info.repo_user}/${repo_info.repo_name}/${repo_info.repo_branch}/${filePath}`;
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

export const loadUserInfo = (username: string, session: Session | null) => {
  return axios
    .get(
      `https://api.github.com/users/${username}/repos`,
      session
        ? {
            headers: { Authorization: `token ${session.accessToken}` },
          }
        : undefined
    )
    .then(({ data }) => data);
};

export const loadMarkdownFileIsomorphic = (
  params: IRepoParams,
  session: Session | null
) => {
  return axios
    .get(
      `https://raw.githubusercontent.com/${params?.repo_user}/${
        params?.repo_name
      }/${params?.repo_branch}/${params?.repo_path?.join('/')}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          ...(session ? { Authorization: `token ${session.accessToken}` } : {}),
        },
      }
    )
    .then(({ data }) =>
      sanitize(marked(data), { USE_PROFILES: { html: true } })
    );
};

export const removeFileFromPath = (path: string | string[]) => {
  let _path = path;
  if (typeof _path === 'string') {
    _path = _path.split('/');
  }
  if (_path.length > 0 && _path[_path.length - 1].includes('.md')) _path.pop();
  return _path.join('/');
};

export const getFileFromPath = (path: string | string[]) => {
  let _path = path;
  if (typeof _path === 'string') {
    _path = _path.split('/');
  }
  _path = _path.pop() || '';
  return _path;
};
