'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import Cookies from 'js-cookie';

import { COOKIES_EXPIRE, IS_THEME_DARK } from '@constants/constants';
import { Theme } from '@interfaces/base';

type ThemeContextType = {
  theme: Theme;
  isDark?: boolean;
  setDark: (isDark: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  const setDark = (value: boolean) => {
    Cookies.set(IS_THEME_DARK, JSON.stringify(value), { expires: COOKIES_EXPIRE });
    setIsDark(value);
  };

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.remove('lightTheme');
      root.classList.add('darkTheme');
    } else {
      root.classList.remove('darkTheme');
      root.classList.add('lightTheme');
    }
  }, [isDark]);

  useEffect(() => {
    setIsDark(Cookies.get(IS_THEME_DARK) === 'true');
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: isDark ? 'dark' : 'light',
        setDark,
        isDark,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
