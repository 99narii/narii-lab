'use client';

// ===========================================
// PortfolioModal Component
// 전체 화면 포트폴리오 상세 모달
// ===========================================

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/contexts';
import type { PortfolioItem } from '@/types';
import styles from './PortfolioModal.module.scss';

// -----------------------------
// Types
// -----------------------------
interface PortfolioModalProps {
  /** 선택된 포트폴리오 아이템 */
  item: PortfolioItem | null;
  /** 모달 닫기 핸들러 */
  onClose: () => void;
  /** 카테고리 라벨 가져오기 함수 */
  getCategoryLabel: (category: string) => string;
}

// -----------------------------
// Component
// -----------------------------
export const PortfolioModal = ({
  item,
  onClose,
  getCategoryLabel,
}: PortfolioModalProps) => {
  const { t, language } = useLanguage();

  // ESC 키 핸들러
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // 배경 클릭 핸들러
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  // ESC 키 이벤트 등록 & 스크롤 방지
  useEffect(() => {
    if (item) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, handleKeyDown]);

  // 모달이 닫혀있으면 렌더링하지 않음
  if (!item) return null;

  // 샘플 이미지 배열 (실제 프로젝트에서는 item.images 등으로 대체)
  const sampleImages = [
    { id: 1, alt: `${item.client} 이미지 1` },
    { id: 2, alt: `${item.client} 이미지 2` },
    { id: 3, alt: `${item.client} 이미지 3` },
  ];

  // Portal을 통해 body에 렌더링
  return createPortal(
    <div
      className={styles.overlay}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-modal-title"
    >
      {/* 메인 컨텐츠 영역 */}
      <div className={styles.modal} role="document">
        {/* 닫기 버튼 */}
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="모달 닫기"
        >
          <svg
            width="32"
            height="32"
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

        {/* 고정 헤더 */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            {/* 카테고리 */}
            <span className={styles.category}>
              {getCategoryLabel(item.category)}
            </span>

            {/* 타이틀 */}
            <h2 id="portfolio-modal-title" className={styles.title}>
              {t(item.title)}
            </h2>

            {/* 설명 */}
            <p className={styles.description}>{t(item.description)}</p>

            {/* 메타 정보 */}
            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <strong>{language === 'ko' ? '클라이언트' : 'Client'}:</strong> {item.client}
              </span>
              <span className={styles.metaItem}>
                <strong>{language === 'ko' ? '연도' : 'Year'}:</strong> {item.year}
              </span>
            </div>

            {/* 태그 */}
            <div className={styles.tags}>
              {item.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>

            {/* 링크 버튼 */}
            <div className={styles.links}>
              <button type="button" className={styles.linkButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                {language === 'ko' ? '사이트 방문' : 'Visit Site'}
              </button>
            </div>
          </div>
        </header>

        {/* 스크롤 가능한 이미지 영역 */}
        <div className={styles.imageContainer}>
          {sampleImages.map((img) => (
            <div key={img.id} className={styles.imageWrap}>
              <div className={styles.imagePlaceholder}>
                <span className={styles.placeholderText}>
                  {item.client} - {img.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};
