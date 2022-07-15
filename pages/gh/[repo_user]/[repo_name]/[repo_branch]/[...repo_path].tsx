import React from 'react';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { FoldersContext, RepoContext } from '../../../../../contexts';
import { PostRow, Sidepanel } from '../../../../../components';
import { sanitize } from 'isomorphic-dompurify';
import { marked } from 'marked';

interface ITree {
  path: string;
  rawURL: string;
  url: string;
  size: number;
}

interface IParams {
  repo_user?: string;
  repo_name?: string;
  repo_branch?: string;
  repo_path?: string[];
}

interface IProps {
  markdownFile: string;
}

const findMarkdown = (
  tree: ITree[],
  repo_info: IParams = { repo_name: '', repo_user: '', repo_branch: '' }
) => {
  let markdownFiles: ITree[] = [];
  tree.map((item) => {
    const { path } = item;
    if (path.match(/\.md/))
      markdownFiles.push({ ...item, rawURL: getFileLocation(path, repo_info) });
  });
  return markdownFiles;
};

const getFileLocation = (filePath: string = '', repo_info: IParams) => {
  return `https://raw.githubusercontent.com/${repo_info.repo_user}/${repo_info.repo_name}/${repo_info.repo_branch}/${filePath}`;
};

const getUniqueFolders = (tree: ITree[]) => {
  const uniqueFolders: any = {};
  tree.map(({ path }) => {
    const _folders: string[] = path.split('/');
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

const RepoPage: React.FC<{ tree: ITree[]; params: IParams; file: string }> = ({
  tree,
  params,
  file,
}) => {
  const getFolders = (tree: ITree[]) => {
    let _files = findMarkdown(tree, params);
    _files = _files.filter(({ path }) => path.includes('/'));
    return getUniqueFolders(_files);
  };

  return (
    <RepoContext.Provider
      value={{
        REPO_OWNER: params?.repo_user || '',
        REPO_NAME: params?.repo_name || '',
        REPO_BRANCH: params?.repo_branch || '',
        REPO_CUR_PATH: params?.repo_path?.join('/') || '',
      }}
    >
      <div className="grid gap-4 grid-cols-12 container mx-auto mt-4">
        <div className="col-span-3">
          <FoldersContext.Provider value={{ folders: getFolders(tree) }}>
            <Sidepanel />
          </FoldersContext.Provider>
        </div>
        <div className="col-span-9 mx-4">
          {params.repo_path?.join('/').includes('.md') ? (
            <div
              className="prose prose-invert"
              dangerouslySetInnerHTML={{ __html: file }}
            ></div>
          ) : (
            <div className="grid gap-10">
              {tree?.map(({ path, url, size }) => (
                <div key={url}>
                  <PostRow
                    href={`/gh/${params.repo_user}/${params.repo_name}/${params.repo_branch}/${path}`}
                    title={path}
                    size={size}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </RepoContext.Provider>
  );
};

export default RepoPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params: IParams = context.params || {};
  const loadStructure = () => {
    return axios
      .get(
        `https://api.github.com/repos/${params?.repo_user}/${params?.repo_name}/git/trees/${params?.repo_branch}?recursive=true`,
        {
          headers: { Authorization: process.env.GITHUB_AUTH_TOKEN },
        }
      )
      .then(({ data }) => {
        const { tree: _tree } = data;
        const markdownFiles = findMarkdown(_tree, params);
        return markdownFiles;
      });
  };
  const loadMarkdownFile = () => {
    return axios
      .get(
        `https://raw.githubusercontent.com/${params?.repo_user}/${
          params?.repo_name
        }/${params?.repo_branch}/${params?.repo_path?.join('/')}`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
          },
        }
      )
      .then(({ data }) =>
        sanitize(marked(data), { USE_PROFILES: { html: true } })
      );
  };

  const tree = await loadStructure();
  if (params?.repo_path?.join('/').includes('.md')) {
    const file = await loadMarkdownFile();
    return { props: { tree, params, file } };
  }
  return { props: { tree, params } };
}
