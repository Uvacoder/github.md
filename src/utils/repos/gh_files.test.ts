import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
import { getMarkDownFile, loadMarkdownFileIsomorphic } from './gh_files';

test('utils/repos/getMarkDownFile()', async () => {
  const data = { file: '' };
  mockedAxios.get.mockImplementation(() => Promise.resolve({ data }));
  const result = await getMarkDownFile('url');
  expect(mockedAxios.get).toHaveBeenCalled();
  expect(result).toBe(data);
});

test('utils/repos/loadMarkdownFileIsomorphic()', async () => {
  const data = '<div>123</div>';
  mockedAxios.get.mockImplementation(() => Promise.resolve({ data }));
  const result = await loadMarkdownFileIsomorphic(
    {
      repo_user: 'user',
      repo_name: 'repo',
    },
    null
  );
  expect(mockedAxios.get).toHaveBeenCalled();
  expect(result).toBe(data);
});
