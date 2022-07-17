import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Header } from '@/components';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen">
        <Header />
        <div className="grid container mx-auto my-4 min-h-full">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
}

export default MyApp;
