'use client';

// ===========================================
// MobileFloatingButtons Component
// 모바일 플로팅 버튼 (상단으로, 테마, 언어, 간편견적)
// ===========================================

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme, useLanguage } from '@/contexts';
import styles from './MobileFloatingButtons.module.scss';

// -----------------------------
// Component
// -----------------------------
export const MobileFloatingButtons = () => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 상단으로 스크롤
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 간편견적으로 이동
  const goToEstimate = () => {
    router.push('/estimate');
  };

  return (
    <div className={styles.container}>
      {/* 메인 토글 버튼 */}
      <button
        type="button"
        className={`${styles.mainButton} ${isExpanded ? styles.active : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={isExpanded}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.menuIcon}
        >
          {isExpanded ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </>
          )}
        </svg>
      </button>

      {/* 확장된 버튼들 */}
      <div className={`${styles.buttons} ${isExpanded ? styles.visible : ''}`}>
        {/* 간편견적 */}
        <button
          type="button"
          className={styles.button}
          onClick={goToEstimate}
          aria-label="간편견적"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <line x1="8" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="12" y2="14" />
          </svg>
        </button>

        {/* 언어 토글 */}
        <button
          type="button"
          className={styles.button}
          onClick={toggleLanguage}
          aria-label={language === 'ko' ? 'Switch to English' : '한국어로 변경'}
        >
          <span className={styles.langText}>
            {language === 'ko' ? 'EN' : 'KO'}
          </span>
        </button>

        {/* 테마 토글 */}
        <button
          type="button"
          className={styles.button}
          onClick={toggleTheme}
          aria-label={theme === 'light' ? '다크 모드로 변경' : '라이트 모드로 변경'}
        >
          {theme === 'light' ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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
          )}
        </button>

        {/* 상단으로 */}
        {showScrollTop && (
          <button
            type="button"
            className={styles.button}
            onClick={scrollToTop}
            aria-label="상단으로 이동"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
