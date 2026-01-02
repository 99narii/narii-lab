'use client';

// ===========================================
// ContactSection Component
// 연락하기 CTA 섹션
// ===========================================

import { useRef } from 'react';
import { useLanguage } from '@/contexts';
import { useIntersectionObserver } from '@/hooks';
import { Button } from '@/components/common';
import { homeData } from '@/data/home';
import styles from './ContactSection.module.scss';

// -----------------------------
// Component
// -----------------------------
export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();
  const isVisible = useIntersectionObserver(sectionRef, {
    threshold: 0.3,
    triggerOnce: true,
  });

  const { contact } = homeData;

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="contact-cta-title"
    >
      <div className={styles.container}>
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          {/* 제목 */}
          <h2
            id="contact-cta-title"
            className={styles.title}
            aria-label={contact.titleAriaLabel}
          >
            {t(contact.title)}
          </h2>

          {/* 설명 */}
          <p className={styles.description}>
            {t(contact.description).split('\n').map((line: string, i: number) => (
              <span key={i}>
                {line}
                {i < t(contact.description).split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>

          {/* CTA 버튼 - 흰색 */}
          <div className={styles.ctaWrap}>
            <Button
              variant="white"
              size="lg"
              href={contact.cta.href}
              ariaLabel={contact.cta.ariaLabel}
            >
              {t(contact.cta.text)}
            </Button>
          </div>

          {/* 이메일 */}
          <p className={styles.email}>
            {language === 'ko' ? '또는 ' : 'or '}
            <a
              href={`mailto:${contact.email.address}`}
              className={styles.emailLink}
              aria-label={contact.email.ariaLabel}
            >
              {contact.email.address}
            </a>
            {language === 'ko' ? '로 연락주세요' : ' to contact us'}
          </p>
        </div>
      </div>
    </section>
  );
};
