// ===========================================
// Admin Login Layout
// 로그인 페이지 레이아웃 (사이드바 없음)
// ===========================================

import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts';

export const metadata: Metadata = {
  title: 'Login - narii lab Admin',
  description: '관리자 로그인',
  robots: 'noindex, nofollow',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
