'use client';

// ===========================================
// About Page
// 어바웃 페이지 - 전면 개편
// ===========================================

import Link from 'next/link';
import { Header, Footer, Button } from '@/components/common';
import { useLanguage } from '@/contexts';
import { aboutData, ServiceItem } from '@/data/about';
import styles from './page.module.scss';

// -----------------------------
// Service Section Component
// 서비스 섹션 (이미지 + 텍스트 교차)
// -----------------------------
interface ServiceSectionProps {
  item: ServiceItem;
  index: number;
  t: (text: { ko: string; en: string }) => string;
}

const ServiceSection = ({ item, index, t }: ServiceSectionProps) => {
  const isReversed = index % 2 === 1;

  return (
    <section
      className={`${styles.serviceSection} ${isReversed ? styles.reversed : ''}`}
    >
      <div className={styles.serviceContainer}>
        {/* 이미지 영역 */}
        <div className={styles.serviceImage}>
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderText}>{item.title}</span>
          </div>
        </div>

        {/* 텍스트 영역 */}
        <div className={styles.serviceContent}>
          <span className={styles.serviceNumber}>0{index + 1}</span>
          <h3 className={styles.serviceTitle}>{item.title}</h3>
          <p className={styles.serviceSubtitle}>{t(item.subtitle)}</p>
          <p className={styles.serviceDescription}>{t(item.description)}</p>
        </div>
      </div>
    </section>
  );
};

// -----------------------------
// Component
// -----------------------------
export default function AboutPage() {
  const { t } = useLanguage();
  const { hero, services, cta } = aboutData;

  return (
    <>
      {/* 헤더 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <main id="main-content" className={styles.main}>
        {/* Hero 섹션 - 새로운 디자인 */}
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <h1 className={styles.heroTitle}>
              {t(hero.title).split('\n').map((line, index) => (
                <span key={index} className={styles.titleLine}>
                  {line}
                </span>
              ))}
            </h1>
            <div className={styles.heroDescription}>
              {t(hero.description).split('\n\n').map((paragraph, pIndex) => (
                <p key={pIndex} className={styles.paragraph}>
                  {paragraph.split('\n').map((line, lIndex) => (
                    <span key={lIndex}>
                      {line}
                      {lIndex < paragraph.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 서비스 섹션들 - 교차 레이아웃 */}
        {services.items.map((item, index) => (
          <ServiceSection key={item.id} item={item} index={index} t={t} />
        ))}

        {/* CTA 섹션 - 프로젝트 시작하기 */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContainer}>
            <h2 className={styles.ctaTitle}>{t(cta.title)}</h2>
            <p className={styles.ctaDescription}>
              {t(cta.description).split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t(cta.description).split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
            <div className={styles.ctaButton}>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  {t(cta.button)}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <Footer />
    </>
  );
}
