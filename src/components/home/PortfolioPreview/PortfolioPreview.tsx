'use client';

// ===========================================
// PortfolioPreview Component
// 포트폴리오 미리보기 섹션 (Supabase 연동)
// ===========================================

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts';
import { useIntersectionObserver } from '@/hooks';
import { SectionTitle, Button, PortfolioModal } from '@/components/common';
import { homeData } from '@/data/home';
import { supabase, type Portfolio, type TechStack } from '@/lib/supabase';
import styles from './PortfolioPreview.module.scss';

// -----------------------------
// Extended Portfolio Type (with resolved tech stacks)
// -----------------------------
export interface PortfolioWithTechStacks extends Portfolio {
  techStacks: TechStack[];
}

// -----------------------------
// Component
// -----------------------------
export const PortfolioPreview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const [portfolios, setPortfolios] = useState<PortfolioWithTechStacks[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PortfolioWithTechStacks | null>(null);
  const isVisible = useIntersectionObserver(sectionRef, {
    threshold: 0.1,
    triggerOnce: true,
  });

  const { portfolioPreview } = homeData;

  // 포트폴리오 및 기술스택 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 포트폴리오와 기술스택을 병렬로 가져오기
        const [portfolioRes, techStackRes] = await Promise.all([
          supabase
            .from('portfolios')
            .select('*')
            .eq('published', true)
            .order('display_order', { ascending: true })
            .limit(6),
          supabase.from('tech_stacks').select('*'),
        ]);

        if (portfolioRes.error) throw portfolioRes.error;
        if (techStackRes.error) throw techStackRes.error;

        const techStackMap = new Map<string, TechStack>(
          (techStackRes.data || []).map((ts) => [ts.id, ts])
        );

        // 포트폴리오에 기술스택 정보 매핑
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
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="portfolio-preview-title"
    >
      <div className={styles.container}>
        {/* 섹션 제목 */}
        <SectionTitle
          title={language === 'ko' ? portfolioPreview.title.ko : portfolioPreview.title.en}
          titleAriaLabel={portfolioPreview.titleAriaLabel}
          subtitle={language === 'ko' ? portfolioPreview.subtitle.ko : portfolioPreview.subtitle.en}
          align="center"
        />

        {/* 로딩 상태 */}
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
          </div>
        ) : portfolios.length === 0 ? (
          <div className={styles.empty}>
            <p>{language === 'ko' ? '등록된 포트폴리오가 없습니다.' : 'No portfolios yet.'}</p>
          </div>
        ) : (
          /* 포트폴리오 그리드 */
          <ul
            className={`${styles.grid} ${isVisible ? styles.visible : ''}`}
            role="list"
          >
            {portfolios.map((item, index) => (
              <li
                key={item.id}
                className={styles.item}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <article
                  className={styles.card}
                  onClick={() => setSelectedItem(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedItem(item)}
                  aria-label={`${item.title} ${language === 'ko' ? '프로젝트 상세 보기' : 'View project details'}`}
                >
                  {/* 썸네일 이미지 */}
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

                  {/* 카드 정보 */}
                  <div className={styles.info}>
                    <span className={styles.category}>{item.category}</span>
                    <h3 className={styles.title}>{item.title}</h3>

                    {/* 기술스택 칩 */}
                    {item.techStacks.length > 0 && (
                      <div className={styles.techStacks}>
                        {item.techStacks.slice(0, 3).map((tech) => (
                          <span key={tech.id} className={styles.techChip}>
                            {tech.name}
                          </span>
                        ))}
                        {item.techStacks.length > 3 && (
                          <span className={styles.techMore}>
                            +{item.techStacks.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}

        {/* 전체 보기 버튼 */}
        <div className={styles.ctaWrap}>
          <Button
            variant="outline"
            href={portfolioPreview.viewAllHref}
            ariaLabel={portfolioPreview.viewAllAriaLabel}
          >
            {language === 'ko' ? portfolioPreview.viewAllText.ko : portfolioPreview.viewAllText.en}
          </Button>
        </div>
      </div>

      {/* 포트폴리오 상세 모달 */}
      <PortfolioModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
};
