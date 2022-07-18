import { ITheme } from '@/typescript/types/theme';
import { createContext } from 'react';

const ThemeContext = createContext<ITheme>({
  theme: 'light',
  changeTheme: () => {},
});

export default ThemeContext;
