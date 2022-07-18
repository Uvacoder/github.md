import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Header } from '@/components';
import { SessionProvider } from 'next-auth/react';
import { ThemeContext } from '@/contexts';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme(() => 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  const changeTheme = () => {
    setTheme((state) => {
      if (state === 'light') {
        localStorage.setItem('theme', 'dark');
        return 'dark';
      }
      localStorage.setItem('theme', 'light');
      return 'light';
    });
  };

  return (
    <div className={theme}>
      <SessionProvider session={session}>
        <ThemeContext.Provider value={{ theme, changeTheme }}>
          <div className="min-h-screen sm:px-10 px-0 text-normal bg-primary-light dark:bg-primary-dark  dark:text-normal-dark transition-colors">
            <Header />
            <div className="grid container mx-auto mt-4 min-h-full pb-20 px-4 sm:px-0">
              <Component {...pageProps} />
            </div>
          </div>
        </ThemeContext.Provider>
      </SessionProvider>
    </div>
  );
}

export default MyApp;
