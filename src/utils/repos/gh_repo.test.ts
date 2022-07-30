import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
import { loadRepoStructure, loadRepoInfo } from './gh_repo';

test('utils/repos/loadRepoInfo()', async () => {
  mockedAxios.get.mockImplementation(() => Promise.resolve({ data }));
  const data = { user: 'success' };
  const result = await loadRepoInfo(
    { repo_user: 'user', repo_name: 'repo' },
    null
  );
  expect(mockedAxios.get).toHaveBeenCalled();
  expect(result).toBe(data);
});

test('utils/repos/loadRepoStructure()', async () => {
  mockedAxios.get.mockImplementation(() => Promise.resolve({ data }));
  const data = { tree: [] };
  const result = await loadRepoStructure(
    { repo_user: 'user', repo_name: 'repo' },
    null
  );
  expect(mockedAxios.get).toHaveBeenCalled();
  expect(result).toEqual([]);
});
