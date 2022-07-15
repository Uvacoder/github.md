import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Header } from '../components';
import { RepoContext } from '../contexts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RepoContext.Provider
      value={{
        REPO_OWNER: 'ilyasudakov',
        REPO_NAME: 'markdown_blog',
        REPO_BRANCH: 'main',
      }}
    >
      <div>
        <Header />
        <div className="grid">
          <Component {...pageProps} />
        </div>
      </div>
    </RepoContext.Provider>
  );
}

export default MyApp;
