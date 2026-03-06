'use client';

// ===========================================
// Portfolio Page
// 포트폴리오 페이지 (Supabase 연동)
// ===========================================

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Header, Footer, SectionTitle, PortfolioModal } from '@/components/common';
import { useLanguage } from '@/contexts';
import { portfolioPageData } from '@/data/portfolio';
import { supabase, type Portfolio, type TechStack } from '@/lib/supabase';
import type { PortfolioWithTechStacks } from '@/components/home/PortfolioPreview/PortfolioPreview';
import styles from './page.module.scss';

// -----------------------------
// Component
// -----------------------------
export default function PortfolioPage() {
  const { language } = useLanguage();
  const [portfolios, setPortfolios] = useState<PortfolioWithTechStacks[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PortfolioWithTechStacks | null>(null);

  // 포트폴리오 및 기술스택 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portfolioRes, techStackRes] = await Promise.all([
          supabase
            .from('portfolios')
            .select('*')
            .eq('published', true)
            .order('display_order', { ascending: true }),
          supabase.from('tech_stacks').select('*'),
        ]);

        if (portfolioRes.error) throw portfolioRes.error;
        if (techStackRes.error) throw techStackRes.error;

        const techStackMap = new Map<string, TechStack>(
          (techStackRes.data || []).map((ts) => [ts.id, ts])
        );

        const portfoliosWithTechStacks: PortfolioWithTechStacks[] = (
          portfolioRes.data || []
        ).map((portfolio) => ({
          ...portfolio,
          techStacks: (portfolio.tech_stack_ids || [])
            .map((id: string) => techStackMap.get(id))
            .filter((ts: TechStack | undefined): ts is TechStack => ts !== undefined),
        }));

        setPortfolios(portfoliosWithTechStacks);
      } catch (err) {
        console.error('Failed to fetch portfolios:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              title={language === 'ko' ? portfolioPageData.title.ko : portfolioPageData.title.en}
              titleAriaLabel={portfolioPageData.titleAriaLabel}
              subtitle={language === 'ko' ? portfolioPageData.subtitle.ko : portfolioPageData.subtitle.en}
              align="center"
            />
          </div>
        </section>

        {/* 포트폴리오 그리드 */}
        <section className={styles.section}>
          <div className={styles.container}>
            {loading ? (
              <div className={styles.loading}>
                <div className={styles.spinner} />
              </div>
            ) : portfolios.length === 0 ? (
              <div className={styles.empty}>
                <p>{language === 'ko' ? '등록된 포트폴리오가 없습니다.' : 'No portfolios yet.'}</p>
              </div>
            ) : (
              <ul className={styles.grid}>
                {portfolios.map((item) => (
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
                        {item.thumbnail_url ? (
                          <Image
                            src={item.thumbnail_url}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className={styles.image}
                          />
                        ) : (
                          <div
                            className={styles.imagePlaceholder}
                            aria-label={item.title}
                          >
                            <span className={styles.placeholderText}>
                              {item.client || item.title}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* 정보 */}
                      <div className={styles.info}>
                        <span className={styles.category}>{item.category}</span>
                        <h2 className={styles.title}>{item.title}</h2>
                        {item.description && (
                          <p className={styles.description}>{item.description}</p>
                        )}
                        {item.techStacks.length > 0 && (
                          <div className={styles.tags}>
                            {item.techStacks.map((tech) => (
                              <span key={tech.id} className={styles.tag}>
                                {tech.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <Footer />

      {/* 포트폴리오 상세 모달 */}
      <PortfolioModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}
