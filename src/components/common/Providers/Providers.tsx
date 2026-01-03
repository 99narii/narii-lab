'use client';

// ===========================================
// Providers Component
// 전역 Context Providers 래퍼
// ===========================================

import type { ReactNode } from 'react';
import { ThemeProvider, LanguageProvider } from '@/contexts';
import { MobileFloatingButtons } from '../MobileFloatingButtons';

// -----------------------------
// Types
// -----------------------------
interface ProvidersProps {
  children: ReactNode;
}

// -----------------------------
// Component
// -----------------------------
export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {children}
        <MobileFloatingButtons />
      </LanguageProvider>
    </ThemeProvider>
  );
};
