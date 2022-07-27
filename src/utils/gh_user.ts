import axios from 'axios';
import { Session } from 'next-auth';

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
