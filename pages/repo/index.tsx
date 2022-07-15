import React from 'react';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';

const REPO_OWNER = 'ilyasudakov';
const REPO_NAME = 'markdown_blog';
const REPO_BRANCH = 'main';
const repoStructure = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${REPO_BRANCH}?recursive=true`;

interface ITree {
  path: string;
  rawURL: string;
  url: string;
}

const findMarkdown = (tree: { path: string; url: string }[]) => {
  let markdownFiles: ITree[] = [];
  tree.map((item) => {
    const { path } = item;
    if (path.match(/\.md/))
      markdownFiles.push({ ...item, rawURL: getFileLocation(path) });
  });
  return markdownFiles;
};

const getFileLocation = (filePath: string = '') => {
  return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/${filePath}`;
};

const MarkdownParser: React.FC<{ tree: ITree[] }> = ({ tree }) => {
  return (
    <div>
      <div></div>
      <div className="prose prose-invert">
        {tree.map(({ path, url }) => {
          return (
            <div key={url}>
              <div>{path}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarkdownParser;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const loadStructure = () => {
    return axios
      .get(repoStructure, {
        headers: { Authorization: process.env.GITHUB_AUTH_TOKEN },
      })
      .then(({ data }) => {
        const { tree: _tree } = data;
        const markdownFiles = findMarkdown(_tree);
        return markdownFiles;
      });
  };
  const tree = await loadStructure();
  return { props: { tree } };
}
