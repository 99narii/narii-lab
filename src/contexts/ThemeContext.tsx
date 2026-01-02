'use client';

// ===========================================
// Theme Context
// 다크모드/라이트모드 테마 관리
// ===========================================

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

// -----------------------------
// Types
// -----------------------------
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// -----------------------------
// Context
// -----------------------------
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// -----------------------------
// Provider
// -----------------------------
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // 초기 테마 로드 (localStorage 또는 시스템 설정)
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setThemeState(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeState('dark');
    }
  }, []);

  // 테마 변경 시 document에 적용
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  // 테마 토글
  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // 테마 직접 설정
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // SSR 중에는 기본값 사용
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// -----------------------------
// Hook
// -----------------------------
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
