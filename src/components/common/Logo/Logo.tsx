'use client';

// ===========================================
// Logo Component
// 브랜드 로고 컴포넌트
// ===========================================

import Link from 'next/link';
import styles from './Logo.module.scss';

// -----------------------------
// Types
// -----------------------------
interface LogoProps {
  /** 로고 스타일 변형 */
  variant?: 'default' | 'white' | 'compact';
  /** 링크 활성화 여부 */
  asLink?: boolean;
}

// -----------------------------
// Component
// -----------------------------
export const Logo = ({ variant = 'default', asLink = true }: LogoProps) => {
  const logoContent = (
    <span
      className={`${styles.logo} ${styles[variant]}`}
      aria-label="narii lab 홈으로 이동"
    >
      {/* 로고 텍스트 */}
      <span className={styles.text}>
        narii
        <span className={styles.accent}>lab</span>
      </span>
    </span>
  );

  // 링크로 감싸거나 그냥 반환
  if (asLink) {
    return (
      <Link href="/" className={styles.link}>
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};
