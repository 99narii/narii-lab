'use client';

// ===========================================
// CoverAnimation Component
// 진입 시 손글씨 효과 커버 애니메이션
// ===========================================

import { useState, useEffect } from 'react';
import { homeData } from '@/data/home';
import styles from './CoverAnimation.module.scss';

// -----------------------------
// Types
// -----------------------------
interface CoverAnimationProps {
  /** 애니메이션 완료 콜백 */
  onComplete: () => void;
}

// -----------------------------
// Component
// -----------------------------
export const CoverAnimation = ({ onComplete }: CoverAnimationProps) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 손글씨 애니메이션 완료 후 페이드아웃 시작
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    // 전체 애니메이션 완료
    const completeTimer = setTimeout(() => {
      setIsAnimating(false);
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // 애니메이션 완료 후 렌더링 중단
  if (!isAnimating) return null;

  return (
    <div
      className={`${styles.cover} ${isFading ? styles.fadeOut : ''}`}
      role="presentation"
      aria-label={homeData.cover.ariaLabel}
    >
      {/* SVG 손글씨 로고 */}
      <svg
        className={styles.logo}
        viewBox="0 0 400 80"
        aria-hidden="true"
      >
        {/* "narii" 텍스트 path */}
        <g className={styles.textGroup}>
          {/* n */}
          <path
            className={styles.letter}
            d="M20 60 L20 35 Q20 20 35 20 Q50 20 50 35 L50 60"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDelay: '0ms' }}
          />
          {/* a */}
          <path
            className={styles.letter}
            d="M70 40 Q70 20 85 20 Q100 20 100 40 L100 60 M100 40 Q100 50 85 50 Q70 50 70 40"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDelay: '150ms' }}
          />
          {/* r */}
          <path
            className={styles.letter}
            d="M120 60 L120 35 Q120 20 135 20"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDelay: '300ms' }}
          />
          {/* i */}
          <path
            className={styles.letter}
            d="M155 30 L155 60 M155 15 L155 18"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDelay: '450ms' }}
          />
          {/* i */}
          <path
            className={styles.letter}
            d="M180 30 L180 60 M180 15 L180 18"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDelay: '600ms' }}
          />
        </g>

        {/* "lab" 텍스트 path - 브랜드 컬러 */}
        <g className={styles.textGroupAccent}>
          {/* l */}
          <path
            className={styles.letterAccent}
            d="M220 10 L220 60"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDelay: '800ms' }}
          />
          {/* a */}
          <path
            className={styles.letterAccent}
            d="M250 40 Q250 20 265 20 Q280 20 280 40 L280 60 M280 40 Q280 50 265 50 Q250 50 250 40"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDelay: '950ms' }}
          />
          {/* b */}
          <path
            className={styles.letterAccent}
            d="M300 10 L300 60 M300 40 Q300 20 315 20 Q330 20 330 40 Q330 60 315 60 Q300 60 300 40"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDelay: '1100ms' }}
          />
        </g>
      </svg>
    </div>
  );
};
