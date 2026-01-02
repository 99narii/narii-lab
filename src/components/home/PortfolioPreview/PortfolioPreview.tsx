'use client';

// ===========================================
// PortfolioPreview Component
// 포트폴리오 미리보기 섹션 (3x2 그리드)
// ===========================================

import { useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts';
import { useIntersectionObserver } from '@/hooks';
import { SectionTitle, Button } from '@/components/common';
import { homeData } from '@/data/home';
import { portfolioData, portfolioCategories } from '@/data/portfolio';
import styles from './PortfolioPreview.module.scss';

// -----------------------------
// Component
// -----------------------------
export const PortfolioPreview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();
  const isVisible = useIntersectionObserver(sectionRef, {
    threshold: 0.1,
    triggerOnce: true,
  });

  const { portfolioPreview } = homeData;
  // 상위 6개 포트폴리오만 표시
  const previewItems = portfolioData.filter(item => item.isFeatured).slice(0, 6);

  // 카테고리 라벨 가져오기
  const getCategoryLabel = (category: string) => {
    const categoryItem = portfolioCategories.find((cat) => cat.id === category);
    return categoryItem ? t(categoryItem.label) : category;
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="portfolio-preview-title"
    >
      <div className={styles.container}>
        {/* 섹션 제목 */}
        <SectionTitle
          title={t(portfolioPreview.title)}
          titleAriaLabel={portfolioPreview.titleAriaLabel}
          subtitle={t(portfolioPreview.subtitle)}
          align="center"
        />

        {/* 포트폴리오 그리드 */}
        <ul
          className={`${styles.grid} ${isVisible ? styles.visible : ''}`}
          role="list"
        >
          {previewItems.map((item, index) => (
            <li
              key={item.id}
              className={styles.item}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link
                href={`/portfolio#${item.id}`}
                className={styles.card}
                aria-label={`${t(item.title)} ${language === 'ko' ? '프로젝트 상세 보기' : 'View project details'}`}
              >
                {/* 썸네일 이미지 */}
                <div className={styles.imageWrap}>
                  {/* 실제 이미지가 없을 경우 플레이스홀더 */}
                  <div
                    className={styles.imagePlaceholder}
                    aria-label={item.thumbnailAlt}
                  >
                    <span className={styles.placeholderText}>
                      {item.client}
                    </span>
                  </div>
                </div>

                {/* 카드 정보 */}
                <div className={styles.info}>
                  <span className={styles.category}>
                    {getCategoryLabel(item.category)}
                  </span>
                  <h3 className={styles.title}>{t(item.title)}</h3>
                  <p className={styles.client}>{item.client}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* 전체 보기 버튼 */}
        <div className={styles.ctaWrap}>
          <Button
            variant="outline"
            href={portfolioPreview.viewAllHref}
            ariaLabel={portfolioPreview.viewAllAriaLabel}
          >
            {t(portfolioPreview.viewAllText)}
          </Button>
        </div>
      </div>
    </section>
  );
};
