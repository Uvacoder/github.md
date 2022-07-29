import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RepoLayout } from '@/components';

const dumbRepoInfo = {
  description: '',
  full_name: '',
  html_url: '',
  id: 0,
  name: '',
  owner: { avatar_url: '/public/favicon.ico', login: 'USERNAME' },
};
const repoParams = {
  repo_user: 'USERNAME',
  repo_name: 'repo',
  repo_branch: 'main',
  repo_path: ['/'],
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

describe('RepoLayout', () => {
  it('renders a Repo Layout with user data', async () => {
    render(<RepoLayout tree={[]} params={repoParams} info={dumbRepoInfo} />);
    const repo_info = await screen.getByText('@USERNAME');
    expect(repo_info).toBeInTheDocument();
  });
  it('renders a Repo Layout with files', async () => {
    render(<RepoLayout tree={files} params={repoParams} info={dumbRepoInfo} />);
    const repo_info = await screen.getByText('@USERNAME');
    expect(repo_info).toBeInTheDocument();
  });
});
