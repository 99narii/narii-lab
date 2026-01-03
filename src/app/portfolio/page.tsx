'use client';

// ===========================================
// Portfolio Page
// 포트폴리오 페이지
// ===========================================

import { useState } from 'react';
import { Header, Footer, SectionTitle, Modal } from '@/components/common';
import { useLanguage } from '@/contexts';
import { portfolioData, portfolioPageData, portfolioCategories } from '@/data/portfolio';
import type { PortfolioItem } from '@/types';
import styles from './page.module.scss';

// -----------------------------
// Component
// -----------------------------
export default function PortfolioPage() {
  const { t, language } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // 카테고리 라벨 가져오기
  const getCategoryLabel = (category: string) => {
    const categoryItem = portfolioCategories.find((cat) => cat.id === category);
    return categoryItem ? t(categoryItem.label) : category;
  };

  return (
    <>
      {/* 헤더 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <main id="main-content" className={styles.main}>
        {/* Hero 섹션 */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <SectionTitle
              title={t(portfolioPageData.title)}
              titleAriaLabel={portfolioPageData.titleAriaLabel}
              subtitle={t(portfolioPageData.subtitle)}
              align="center"
            />
          </div>
        </section>

        {/* 포트폴리오 그리드 */}
        <section className={styles.section}>
          <div className={styles.container}>
            <ul className={styles.grid}>
              {portfolioData.map((item) => (
                <li key={item.id} id={item.id} className={styles.item}>
                  <article
                    className={styles.card}
                    onClick={() => setSelectedItem(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedItem(item)}
                  >
                    {/* 썸네일 */}
                    <div className={styles.imageWrap}>
                      <div
                        className={styles.imagePlaceholder}
                        aria-label={item.thumbnailAlt}
                      >
                        <span className={styles.placeholderText}>
                          {item.client}
                        </span>
                      </div>
                    </div>

                    {/* 정보 */}
                    <div className={styles.info}>
                      <span className={styles.category}>
                        {getCategoryLabel(item.category)}
                      </span>
                      <h2 className={styles.title}>{t(item.title)}</h2>
                      <p className={styles.description}>{t(item.description)}</p>
                      <div className={styles.tags}>
                        {item.tags.map((tag) => (
                          <span key={tag} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <Footer />

      {/* 포트폴리오 상세 모달 */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        size="lg"
      >
        {selectedItem && (
          <div className={styles.modalContent}>
            {/* 모달 썸네일 */}
            <div className={styles.modalImageWrap}>
              <div
                className={styles.modalImagePlaceholder}
                aria-label={selectedItem.thumbnailAlt}
              >
                <span className={styles.modalPlaceholderText}>
                  {selectedItem.client}
                </span>
              </div>
            </div>

            {/* 모달 정보 */}
            <div className={styles.modalInfo}>
              <span className={styles.modalCategory}>
                {getCategoryLabel(selectedItem.category)}
              </span>
              <h2 className={styles.modalTitle}>{t(selectedItem.title)}</h2>
              <p className={styles.modalDescription}>{t(selectedItem.description)}</p>

              {/* 프로젝트 정보 */}
              <div className={styles.modalMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>
                    {language === 'ko' ? '클라이언트' : 'Client'}
                  </span>
                  <span className={styles.metaValue}>{selectedItem.client}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>
                    {language === 'ko' ? '연도' : 'Year'}
                  </span>
                  <span className={styles.metaValue}>{selectedItem.year}</span>
                </div>
              </div>

              {/* 태그 */}
              <div className={styles.modalTags}>
                {selectedItem.tags.map((tag) => (
                  <span key={tag} className={styles.modalTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
