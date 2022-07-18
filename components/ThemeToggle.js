import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme);
  const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light';

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem('theme', activeTheme);
  }, [activeTheme]);

  return (
    <div
      className="rounded-full border bg-stone-50 dark:bg-stone-900 p-2 border-stone-500
       dark:border-stone-400 cursor-pointer text-center"
      onClick={() => setActiveTheme(inactiveTheme)}
    >
      {activeTheme === 'light' ? '🌙' : '☀️'}
    </div>
  );
};

export default ThemeToggle;
