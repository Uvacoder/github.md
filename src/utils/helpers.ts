import { IRepoParams } from '@/types';

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

export const getRawFileLocation = (
  filePath: string = '',
  repo_info: IRepoParams
) => {
  return `https://raw.githubusercontent.com/${repo_info.repo_user}/${repo_info.repo_name}/${repo_info.repo_branch}/${filePath}`;
};

export const calcReadingTime = (size: number) => {
  const wpm = 180;
  const word_length = 5;
  const words = size / word_length;
  const words_time = words / wpm;
  const bonus = 1;
  return Math.floor(words_time + bonus);
};
