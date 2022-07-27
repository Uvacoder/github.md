import { ITheme } from '@/types';
import { createContext } from 'react';

const ThemeContext = createContext<ITheme>({
  theme: 'light',
  changeTheme: () => {},
});

export default ThemeContext;
