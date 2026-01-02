'use client';

// ===========================================
// Portfolio Page
// 포트폴리오 페이지
// ===========================================

import { Header, Footer, SectionTitle } from '@/components/common';
import { useLanguage } from '@/contexts';
import { portfolioData, portfolioPageData, portfolioCategories } from '@/data/portfolio';
import styles from './page.module.scss';

// -----------------------------
// Component
// -----------------------------
export default function PortfolioPage() {
  const { t, language } = useLanguage();

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
                  <article className={styles.card}>
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
    </>
  );
}
