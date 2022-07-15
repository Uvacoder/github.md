import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import axios from 'axios';

const REPO_OWNER = 'ilyasudakov';
const REPO_NAME = 'osfix_erp_frontend';
const REPO_BRANCH = 'main';
const repoStructure = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${REPO_BRANCH}?recursive=true`;

interface TreeState {
  path: string;
  rawURL: string;
  url: string;
}

const findMarkdown = (tree: { path: string; url: string }[]) => {
  let markdownFiles: TreeState[] = [];
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

const MarkdownParser: React.FC = () => {
  const [tree, setTree] = useState<TreeState[]>([]);
  useEffect(() => {
    const loadStructure = () => {
      return axios.get(repoStructure).then(({ data }) => {
        const { tree: _tree } = data;
        const markdownFiles = findMarkdown(_tree);
        console.log(markdownFiles);
        setTree(markdownFiles);
      });
    };

    loadStructure();
  }, []);

  return (
    <div>
      <div></div>
      <div>
        {tree.map(({ path, url }) => (
          <div key={url}>{path}</div>
        ))}
      </div>
    </div>
  );
};

export default MarkdownParser;
