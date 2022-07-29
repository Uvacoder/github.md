import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilesList } from '@/components';
import { RepoContext } from './RepoLayout';
import React from 'react';
// import { IRepoInfo } from '@/types';

const customRender = (
  ui: React.ReactNode,
  value: {
    owner: string;
    name: string;
    branch: string;
    curPath?: string | undefined;
    repoInfo: any;
  }
) => {
  return render(
    <RepoContext.Provider value={value}>{ui}</RepoContext.Provider>
  );
};

const repoInfo = {
  owner: 'user',
  name: 'repo',
  branch: 'main',
  repoInfo: {},
};

const files = [
  { path: 'file.md', url: '/1', size: 500, rawURL: '/' },
  {
    path: 'some-folder/file-123.md',
    url: '/2',
    size: 500,
    rawURL: '/',
  },
];

describe('FilesList', () => {
  it('renders empty repo list', async () => {
    await customRender(<FilesList tree={[]} />, {
      ...repoInfo,
      curPath: '/',
    });
    const text = screen.getByText('No markdown files in this project');
    expect(text).toBeInTheDocument();
  });

  it('renders list of files', async () => {
    await customRender(<FilesList tree={files} />, {
      ...repoInfo,
      repoInfo: {},
    });
    const text = screen.getByText('file.md');
    expect(text).toBeInTheDocument();
  });

  it('renders list of files with curPath', async () => {
    await customRender(<FilesList tree={files} />, {
      ...repoInfo,
      curPath: 'some-folder',
    });
    const text = screen.getByText('file-123.md');
    expect(text).toBeInTheDocument();
  });
});
