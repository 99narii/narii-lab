'use client';

// ===========================================
// Footer Component
// 하단 푸터
// ===========================================

import Link from 'next/link';
import { useLanguage } from '@/contexts';
import { Logo } from '../Logo';
import { navigationData } from '@/data/navigation';
import styles from './Footer.module.scss';

// -----------------------------
// Component
// -----------------------------
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        {/* 상단 영역 */}
        <div className={styles.top}>
          {/* 로고 & 설명 */}
          <div className={styles.brand}>
            <Logo variant="white" />
            <p className={styles.description}>
              {language === 'ko' ? (
                <>
                  브랜딩, 기획, 디자인, 개발까지.
                  <br />
                  당신의 비즈니스를 디지털로 완성합니다.
                </>
              ) : (
                <>
                  Branding, planning, design, development.
                  <br />
                  We complete your business digitally.
                </>
              )}
            </p>
          </div>

          {/* 내비게이션 */}
          <nav className={styles.nav} aria-label="푸터 내비게이션">
            <h3 className={styles.navTitle}>Menu</h3>
            <ul className={styles.navList}>
              {navigationData.map((item) => (
                <li key={item.id} className={styles.navItem}>
                  <Link
                    href={item.href}
                    className={styles.navLink}
                    aria-label={item.ariaLabel}
                  >
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 연락처 */}
          <div className={styles.contact}>
            <h3 className={styles.navTitle}>Contact</h3>
            <ul className={styles.contactList}>
              <li>
                <a
                  href="mailto:hello@nariilab.com"
                  className={styles.contactLink}
                  aria-label="이메일로 연락하기"
                >
                  hello@nariilab.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 구분선 */}
        <hr className={styles.divider} />

        {/* 하단 영역 */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} narii lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
