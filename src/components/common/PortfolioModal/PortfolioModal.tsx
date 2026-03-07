'use client';

// ===========================================
// PortfolioModal Component
// 전체 화면 포트폴리오 상세 모달 (Supabase 연동)
// ===========================================

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useLanguage } from '@/contexts';
import type { PortfolioWithTechStacks } from '@/components/home/PortfolioPreview/PortfolioPreview';
import styles from './PortfolioModal.module.scss';

// -----------------------------
// Types
// -----------------------------
interface PortfolioModalProps {
  /** 선택된 포트폴리오 아이템 */
  item: PortfolioWithTechStacks | null;
  /** 모달 닫기 핸들러 */
  onClose: () => void;
}

// -----------------------------
// Component
// -----------------------------
export const PortfolioModal = ({ item, onClose }: PortfolioModalProps) => {
  const { language } = useLanguage();

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
            <span className={styles.category}>{item.category}</span>

            {/* 타이틀 */}
            <h2 id="portfolio-modal-title" className={styles.title}>
              {item.title}
            </h2>

            {/* 설명 */}
            {item.description && (
              <p className={styles.description}>{item.description}</p>
            )}

            {/* 메타 정보 */}
            <div className={styles.meta}>
              {item.client && (
                <span className={styles.metaItem}>
                  <strong>{language === 'ko' ? '클라이언트' : 'Client'}:</strong>{' '}
                  {item.client}
                </span>
              )}
              {item.year && (
                <span className={styles.metaItem}>
                  <strong>{language === 'ko' ? '연도' : 'Year'}:</strong>{' '}
                  {item.year}
                </span>
              )}
            </div>

            {/* 기술스택 태그 */}
            {item.techStacks.length > 0 && (
              <div className={styles.tags}>
                {item.techStacks.map((tech) => (
                  <span key={tech.id} className={styles.tag}>
                    {tech.name}
                  </span>
                ))}
              </div>
            )}

            {/* 링크 버튼들 */}
            {(item.link || item.github_link) && (
              <div className={styles.links}>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkButton}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    {language === 'ko' ? '사이트 방문' : 'Visit Site'}
                  </a>
                )}
                {item.github_link && (
                  <a
                    href={item.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkButton}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                    {language === 'ko' ? '프로젝트 상세보기' : 'View Details'}
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        {/* 이미지 영역 */}
        <div className={styles.imageContainer}>
          {item.thumbnail_url ? (
            <div className={styles.imageWrap}>
              <Image
                src={item.thumbnail_url}
                alt={item.title}
                fill
                sizes="100vw"
                className={styles.image}
              />
            </div>
          ) : (
            <div className={styles.imageWrap}>
              <div className={styles.imagePlaceholder}>
                <span className={styles.placeholderText}>
                  {item.client || item.title}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
