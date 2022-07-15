import React from 'react';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { PostRow, Sidepanel } from '../../components';
import { FoldersContext } from '../../contexts';

const REPO_OWNER = 'ilyasudakov';
const REPO_NAME = 'markdown_blog';
const REPO_BRANCH = 'main';
const repoStructure = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${REPO_BRANCH}?recursive=true`;

interface ITree {
  path: string;
  rawURL: string;
  url: string;
  size: number;
}

const findMarkdown = (tree: ITree[]) => {
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

const getUniqueFolders = (tree: ITree[]) => {
  const uniqueFolders: any = {};
  tree.map(({ path }) => {
    const _folders = path.split('/');
    _folders.pop();
    let cur_unique_path = '';
    _folders.map((folder) => {
      cur_unique_path =
        cur_unique_path === '' ? folder : cur_unique_path + '/' + folder;
      uniqueFolders[cur_unique_path] = true;
    });
  });
  return Object.keys(uniqueFolders).map((value) => ({ path: value }));
};

const getFolders = (tree: ITree[]) => {
  console.log(tree);

  let _files = findMarkdown(tree);
  _files = _files.filter(({ path }) => path.includes('/'));
  return getUniqueFolders(_files);
};

const MarkdownParser: React.FC<{ tree: ITree[] }> = ({ tree }) => {
  return (
    <div className="grid gap-4 grid-cols-12 container mx-auto mt-4">
      <div className="col-span-3">
        <FoldersContext.Provider value={{ folders: getFolders(tree) }}>
          <Sidepanel />
        </FoldersContext.Provider>
      </div>
      <div className="col-span-9">
        <div className="grid gap-4">
          {tree.map(({ path, url, size }) => (
            <div key={url}>
              <PostRow
                href={`${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/${path}`}
                title={path}
                size={size}
              />
            </div>
          ))}
        </div>
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
