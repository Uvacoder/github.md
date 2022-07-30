import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
import { loadUserInfo } from './gh_user';

test('utils/repos/loadUserInfo()', async () => {
  const data = { user: 'success' };
  mockedAxios.get.mockImplementation(() => Promise.resolve({ data }));
  const result = await loadUserInfo('username', null);
  expect(mockedAxios.get).toHaveBeenCalled();
  expect(result).toBe(data);
});
