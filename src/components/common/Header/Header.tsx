'use client';

// ===========================================
// Header Component
// 상단 헤더 (로고 + 내비게이션 + 토글)
// ===========================================

import { useState, useEffect } from 'react';
import { useTheme, useLanguage } from '@/contexts';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import styles from './Header.module.scss';

// -----------------------------
// Icons
// -----------------------------
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// -----------------------------
// Component
// -----------------------------
export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  // 스크롤 상태
  const [isScrolled, setIsScrolled] = useState(false);
  // 모바일 메뉴 상태
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 모바일 메뉴 토글
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // 모바일 메뉴 닫기
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <div className={styles.container}>
          {/* 로고 */}
          <Logo />

          {/* 데스크탑: 내비게이션 + 토글 */}
          <div className={styles.rightSection}>
            {/* 내비게이션 */}
            <div className={styles.desktopNav}>
              <Navigation />
            </div>

            {/* 토글 버튼 그룹 */}
            <div className={styles.toggleGroup}>
              {/* 언어 토글 */}
              <button
                className={styles.toggleButton}
                onClick={toggleLanguage}
                aria-label={language === 'ko' ? 'Switch to English' : '한국어로 변경'}
              >
                <span className={styles.langText}>
                  {language === 'ko' ? 'EN' : 'KO'}
                </span>
              </button>

              {/* 테마 토글 */}
              <button
                className={styles.toggleButton}
                onClick={toggleTheme}
                aria-label={theme === 'light' ? '다크모드로 변경' : '라이트모드로 변경'}
              >
                <span className={styles.themeIcon}>
                  {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                </span>
              </button>
            </div>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className={`${styles.menuButton} ${isMobileMenuOpen ? styles.open : ''}`}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={styles.menuIcon} />
          </button>
        </div>
      </header>

      {/* 모바일 오버레이 */}
      {isMobileMenuOpen && (
        <div
          className={styles.overlay}
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* 모바일 내비게이션 */}
      <div id="mobile-menu" className={styles.mobileNav}>
        <Navigation isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      </div>
    </>
  );
};
