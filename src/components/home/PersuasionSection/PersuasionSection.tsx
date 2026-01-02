'use client';

// ===========================================
// PersuasionSection Component
// 설득 문구 섹션
// ===========================================

import { useRef, type ReactNode } from 'react';
import { useLanguage } from '@/contexts';
import { useIntersectionObserver } from '@/hooks';
import { SectionTitle } from '@/components/common';
import { homeData } from '@/data/home';
import styles from './PersuasionSection.module.scss';

// -----------------------------
// Icon Components
// 아이콘 컴포넌트 (인라인 SVG)
// -----------------------------
const icons: Record<string, ReactNode> = {
  experience: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  ),
  quality: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  communication: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

// -----------------------------
// Component
// -----------------------------
export const PersuasionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const isVisible = useIntersectionObserver(sectionRef, {
    threshold: 0.2,
    triggerOnce: true,
  });

  const { persuasion } = homeData;

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="persuasion-title"
    >
      <div className={styles.container}>
        {/* 섹션 제목 */}
        <SectionTitle
          title={t(persuasion.title)}
          titleAriaLabel={persuasion.titleAriaLabel}
          subtitle={t(persuasion.subtitle)}
          align="center"
        />

        {/* 설득 포인트 리스트 */}
        <ul className={`${styles.list} ${isVisible ? styles.visible : ''}`}>
          {persuasion.items.map((item, index) => (
            <li
              key={item.id}
              className={styles.item}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* 아이콘 */}
              <div className={styles.iconWrap} aria-hidden="true">
                {icons[item.icon]}
              </div>
              {/* 텍스트 */}
              <h3 className={styles.itemTitle}>{t(item.title)}</h3>
              <p className={styles.itemDescription}>
                {t(item.description).split('\n').map((line: string, i: number) => (
                  <span key={i}>
                    {line}
                    {i < t(item.description).split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
