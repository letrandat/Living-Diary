
import { createContext, useContext, useState, useEffect, type ReactNode, type ReactElement } from 'react';
import type { Theme } from '../types';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'dark', toggleTheme: () => {} });

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem('arboria_theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {}
  return 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }): ReactElement {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('arboria_theme', theme); } catch {}
  }, [theme]);

  function toggleTheme(): void {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
