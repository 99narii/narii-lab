// ===========================================
// Navigation Data (Bilingual: ko/en)
// ===========================================

import type { NavItem } from '@/types';

export const navigationData: NavItem[] = [
  {
    id: 'home',
    label: {
      ko: '홈',
      en: 'Home',
    },
    href: '/',
    ariaLabel: '홈으로 이동',
  },
  {
    id: 'about',
    label: {
      ko: '어바웃',
      en: 'About',
    },
    href: '/about',
    ariaLabel: '어바웃 페이지로 이동',
  },
  {
    id: 'portfolio',
    label: {
      ko: '포트폴리오',
      en: 'Portfolio',
    },
    href: '/portfolio',
    ariaLabel: '포트폴리오 페이지로 이동',
  },
  {
    id: 'estimate',
    label: {
      ko: '간편견적',
      en: 'Estimate',
    },
    href: '/estimate',
    ariaLabel: '간편견적 페이지로 이동',
  },
  {
    id: 'contact',
    label: {
      ko: '연락하기',
      en: 'Contact',
    },
    href: '/contact',
    ariaLabel: '연락하기 페이지로 이동',
  },
];
