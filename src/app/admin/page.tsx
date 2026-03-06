// ===========================================
// Admin Dashboard Page
// 관리자 대시보드
// ===========================================

import Link from 'next/link';
import styles from './page.module.scss';

export default function AdminPage() {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.subtitle}>narii lab 관리자 페이지입니다.</p>

      <div className={styles.cards}>
        <Link href="/admin/portfolios" className={styles.card}>
          <div className={styles.cardIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21,15 16,10 5,21" />
            </svg>
          </div>
          <h2 className={styles.cardTitle}>포트폴리오 관리</h2>
          <p className={styles.cardDescription}>
            포트폴리오 추가, 수정, 삭제
          </p>
        </Link>
      </div>
    </div>
  );
}
