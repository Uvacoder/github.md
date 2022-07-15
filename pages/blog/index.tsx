import React from 'react';
import { marked } from 'marked';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { sanitize } from 'isomorphic-dompurify';

const REPO_OWNER = 'ilyasudakov';
const REPO_NAME = 'markdown_blog';
const REPO_BRANCH = 'main';

interface IProps {
  markdownFile: string;
}

const getMarkDownFile = async (url: string) => {
  return await axios
    .get(url, {
      headers: {
        // Authorization: process.env.GITHUB_AUTH_TOKEN, ??
        Accept: 'application/vnd.github+json',
      },
    })
    .then(({ data }) => data);
};

const BlogPage: React.FC<IProps> = ({ markdownFile }) => {
  return (
    <div>
      <div></div>
      <div className="prose prose-invert">
        <div dangerouslySetInnerHTML={{ __html: markdownFile }}></div>
      </div>
    </div>
  );
};

export default BlogPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const markdownFile = await getMarkDownFile(
    `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/main.md`
  ).then((res) => sanitize(marked(res), { USE_PROFILES: { html: true } }));
  return { props: { markdownFile } };
}
