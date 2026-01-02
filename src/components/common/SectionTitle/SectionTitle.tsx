'use client';

// ===========================================
// SectionTitle Component
// 섹션 제목 컴포넌트
// ===========================================

import styles from './SectionTitle.module.scss';

// -----------------------------
// Types
// -----------------------------
interface SectionTitleProps {
  /** 제목 */
  title: string;
  /** 제목 접근성 라벨 */
  titleAriaLabel?: string;
  /** 부제목 */
  subtitle?: string;
  /** 정렬 */
  align?: 'left' | 'center';
  /** 색상 테마 */
  theme?: 'light' | 'dark';
}

// -----------------------------
// Component
// -----------------------------
export const SectionTitle = ({
  title,
  titleAriaLabel,
  subtitle,
  align = 'center',
  theme = 'light',
}: SectionTitleProps) => {
  return (
    <div className={`${styles.wrapper} ${styles[align]} ${styles[theme]}`}>
      <h2
        className={styles.title}
        aria-label={titleAriaLabel}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={styles.subtitle}>{subtitle}</p>
      )}
    </div>
  );
};
