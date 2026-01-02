'use client';

// ===========================================
// Button Component
// 공통 버튼 컴포넌트
// ===========================================

import Link from 'next/link';
import type { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

// -----------------------------
// Types
// -----------------------------
interface ButtonBaseProps {
  /** 버튼 스타일 변형 */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  /** 버튼 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 전체 너비 사용 */
  fullWidth?: boolean;
  /** 버튼 내용 */
  children: ReactNode;
  /** 접근성 라벨 */
  ariaLabel?: string;
}

interface ButtonAsButton extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  isExternal?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

// -----------------------------
// Component
// -----------------------------
export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  ariaLabel,
  ...props
}: ButtonProps) => {
  // 클래스 조합
  const className = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
  ].filter(Boolean).join(' ');

  // Link인 경우
  if ('href' in props && props.href) {
    const { href, isExternal, ...rest } = props;

    if (isExternal) {
      return (
        <a
          href={href}
          className={className}
          aria-label={ariaLabel}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  // Button인 경우
  const { ...buttonProps } = props as ButtonAsButton;

  return (
    <button
      className={className}
      aria-label={ariaLabel}
      type="button"
      {...buttonProps}
    >
      {children}
    </button>
  );
};
