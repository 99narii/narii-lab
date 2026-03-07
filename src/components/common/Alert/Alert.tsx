'use client';

// ===========================================
// Alert Component
// 커스텀 알럿 모달
// ===========================================

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './Alert.module.scss';

// -----------------------------
// Types
// -----------------------------
export interface AlertProps {
  /** 알럿 표시 여부 */
  isOpen: boolean;
  /** 제목 */
  title?: string;
  /** 메시지 */
  message: string;
  /** 확인 버튼 텍스트 */
  confirmText?: string;
  /** 닫기 핸들러 */
  onClose: () => void;
  /** 타입 (성공/에러/정보) */
  type?: 'success' | 'error' | 'info';
}

// -----------------------------
// Component
// -----------------------------
export const Alert = ({
  isOpen,
  title,
  message,
  confirmText = '확인',
  onClose,
  type = 'info',
}: AlertProps) => {
  // ESC 키 핸들러
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // ESC 키 이벤트 등록 & 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  // 아이콘 렌더링
  const renderIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22,4 12,14.01 9,11.01" />
          </svg>
        );
      case 'error':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        );
    }
  };

  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.alert}>
        {/* 콘텐츠 */}
        <div className={styles.content}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <p className={styles.message}>{message}</p>
        </div>

        {/* 버튼 */}
        <button
          type="button"
          className={styles.button}
          onClick={onClose}
          autoFocus
        >
          {confirmText}
        </button>
      </div>
    </div>,
    document.body
  );
};
