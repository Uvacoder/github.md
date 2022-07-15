import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Header, Sidepanel } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <div className="grid gap-4 grid-cols-12 container mx-auto mt-4">
        <div className="col-span-2">
          <Sidepanel />
        </div>
        <div className="col-span-10">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
