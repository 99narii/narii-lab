// ===========================================
// Admin Layout
// 관리자 페이지 레이아웃
// ===========================================

import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts';
import { AdminLayout } from '@/components/admin';

export const metadata: Metadata = {
  title: 'Admin - narii lab',
  description: '포트폴리오 관리자 페이지',
  robots: 'noindex, nofollow',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayout>{children}</AdminLayout>
    </AuthProvider>
  );
}
