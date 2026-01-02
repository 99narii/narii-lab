'use client';

// ===========================================
// Language Context
// 다국어 (한국어/영어) 관리
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
export type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: <T>(data: { ko: T; en: T }) => T;
}

// -----------------------------
// Context
// -----------------------------
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// -----------------------------
// Provider
// -----------------------------
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>('ko');
  const [mounted, setMounted] = useState(false);

  // 초기 언어 로드 (localStorage)
  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang) {
      setLanguageState(savedLang);
    }
  }, []);

  // 언어 변경 시 저장
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language);
      document.documentElement.setAttribute('lang', language);
    }
  }, [language, mounted]);

  // 언어 토글
  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'ko' ? 'en' : 'ko'));
  };

  // 언어 직접 설정
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // 번역 함수 - 현재 언어에 맞는 데이터 반환
  const t = <T,>(data: { ko: T; en: T }): T => {
    return data[language];
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// -----------------------------
// Hook
// -----------------------------
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
