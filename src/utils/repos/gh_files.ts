import { IRepoParams } from '@/types';
import { sanitize } from 'isomorphic-dompurify';
import { marked } from 'marked';
import axios from 'axios';
import { Session } from 'next-auth';

export const getMarkDownFile = async (url: string) => {
  return await axios
    .get(url, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    })
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
