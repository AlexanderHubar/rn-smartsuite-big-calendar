import { createContext, useContext } from 'react';

import { lightTheme } from './lightTheme';

export const ThemeContext = createContext(lightTheme);

export const useTheme = () => {
  const customTheme = useContext(ThemeContext);
  if (!customTheme) {
    return lightTheme;
  }
  return customTheme;
};
