// ===========================================
// SEO Data
// ===========================================

import type { PageSEO } from '@/types';

export const seoData = {
  // -----------------------------
  // Site Info
  // -----------------------------
  siteName: 'narii lab',
  siteUrl: 'https://nariilab.com',
  defaultOgImage: '/images/og-image.jpg',
  locale: 'ko_KR',

  // -----------------------------
  // Default SEO
  // -----------------------------
  default: {
    title: 'narii lab | portfolio',
    description: '비즈니스 함께 고민하는 개발자 김나희입니다.',
    keywords: ['웹 에이전시', '웹 개발', 'UI/UX 디자인', '브랜딩', '앱 개발', '웹제작'],
  } as PageSEO,

  // -----------------------------
  // Page SEO
  // -----------------------------
  pages: {
    home: {
      title: 'narii lab | portfolio',
      description: '비즈니스 함께 고민하는 개발자 김나희입니다.',
      keywords: ['웹 에이전시', '웹 개발', 'UI/UX 디자인', '브랜딩', '앱 개발'],
    } as PageSEO,

    about: {
      title: 'about | narii lab',
      description: '철학을 소개합니다.',
      keywords: ['회사 소개', '웹 에이전시 소개', '팀 소개'],
    } as PageSEO,

    portfolio: {
      title: 'portfolio | narii lab',
      description: 'narii lab의 프로젝트들을 확인하세요. 웹사이트, 앱, 브랜딩, UI/UX 디자인 작업물.',
      keywords: ['포트폴리오', '웹 디자인 포트폴리오', '앱 개발 포트폴리오'],
    } as PageSEO,

    estimate: {
      title: 'estimate | narii lab',
      description: '프로젝트 예상 비용을 빠르게 확인해보세요. 웹사이트, 앱, 브랜딩 견적.',
      keywords: ['웹사이트 견적', '앱 개발 비용', '디자인 견적'],
    } as PageSEO,

    contact: {
      title: 'contact | narii lab',
      description: '프로젝트 문의 및 상담을 요청하세요. 빠른 답변을 약속드립니다.',
      keywords: ['프로젝트 문의', '상담 요청', '연락처'],
    } as PageSEO,
  },
};
