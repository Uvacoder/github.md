import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Header } from '@/components';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <div>
      <SessionProvider session={session}>
        <div className="min-h-screen sm:px-10 px-0 text-normal bg-primary-light dark:bg-primary-dark  dark:text-normal-dark transition-colors">
          <Header />
          <div className="grid container mx-auto mt-4 min-h-full pb-20 px-4 sm:px-0">
            <Component {...pageProps} />
          </div>
        </div>
      </SessionProvider>
    </div>
  );
}

export default MyApp;
