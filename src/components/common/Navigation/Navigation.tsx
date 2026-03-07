'use client';

// ===========================================
// Navigation Component
// 메인 내비게이션 메뉴
// ===========================================

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts';
import { navigationData } from '@/data/navigation';
import styles from './Navigation.module.scss';

// -----------------------------
// Types
// -----------------------------
interface NavigationProps {
  /** 모바일 메뉴 열림 상태 */
  isOpen?: boolean;
  /** 메뉴 닫기 핸들러 */
  onClose?: () => void;
}

// -----------------------------
// Component
// -----------------------------
export const Navigation = ({ isOpen = false, onClose }: NavigationProps) => {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav
      className={`${styles.nav} ${isOpen ? styles.open : ''}`}
      aria-label="메인 내비게이션"
    >
      {/* 모바일 닫기 버튼 */}
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="메뉴 닫기"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* 내비게이션 리스트 */}
      <ul className={styles.list} role="menubar">
        {navigationData.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.id} className={styles.item} role="none">
              <Link
                href={item.href}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
                aria-label={item.ariaLabel}
                aria-current={isActive ? 'page' : undefined}
                role="menuitem"
                onClick={onClose}
              >
                {t(item.label)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
