'use client';

// ===========================================
// Modal Component
// 재사용 가능한 모달 컴포넌트
// ===========================================

import { useEffect, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

// -----------------------------
// Types
// -----------------------------
interface ModalProps {
  /** 모달 열림 상태 */
  isOpen: boolean;
  /** 모달 닫기 핸들러 */
  onClose: () => void;
  /** 모달 내용 */
  children: ReactNode;
  /** 모달 크기 */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** 배경 클릭 시 닫기 */
  closeOnBackdrop?: boolean;
  /** ESC 키로 닫기 */
  closeOnEsc?: boolean;
  /** 닫기 버튼 표시 */
  showCloseButton?: boolean;
  /** 추가 클래스명 */
  className?: string;
}

// -----------------------------
// Component
// -----------------------------
export const Modal = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEsc = true,
  showCloseButton = true,
  className = '',
}: ModalProps) => {
  // ESC 키 핸들러
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc) {
        onClose();
      }
    },
    [closeOnEsc, onClose]
  );

  // 배경 클릭 핸들러
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget && closeOnBackdrop) {
        onClose();
      }
    },
    [closeOnBackdrop, onClose]
  );

  // ESC 키 이벤트 등록
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  // Portal을 통해 body에 렌더링
  return createPortal(
    <div
      className={styles.overlay}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${styles.modal} ${styles[size]} ${className}`}
        role="document"
      >
        {/* 닫기 버튼 */}
        {showCloseButton && (
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="모달 닫기"
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
        )}

        {/* 모달 컨텐츠 */}
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
};
