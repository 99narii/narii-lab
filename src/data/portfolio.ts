// ===========================================
// Portfolio Data (Bilingual: ko/en)
// ===========================================

import type { PortfolioItem, PortfolioCategoryItem } from '@/types';

// -----------------------------
// Categories
// -----------------------------
export const portfolioCategories: PortfolioCategoryItem[] = [
  { id: 'all', label: { ko: '전체', en: 'All' } },
  { id: 'web', label: { ko: '웹사이트', en: 'Website' } },
  { id: 'app', label: { ko: '앱', en: 'App' } },
  { id: 'branding', label: { ko: '브랜딩', en: 'Branding' } },
  { id: 'uiux', label: { ko: 'UI/UX', en: 'UI/UX' } },
];

// -----------------------------
// Portfolio Items
// -----------------------------
export const portfolioData: PortfolioItem[] = [
  {
    id: 'project-1',
    title: { ko: '테크 스타트업 브랜드 사이트', en: 'Tech Startup Brand Website' },
    client: 'TechVenture',
    category: 'web',
    thumbnail: '/images/portfolio/project-1.jpg',
    thumbnailAlt: 'TechVenture 브랜드 웹사이트 메인 화면',
    description: {
      ko: '혁신적인 스타트업의 브랜드 아이덴티티를 반영한 모던 웹사이트',
      en: 'Modern website reflecting an innovative startup brand identity',
    },
    tags: ['Next.js', 'React', 'SCSS'],
    year: 2024,
    isFeatured: true,
  },
  {
    id: 'project-2',
    title: { ko: '프리미엄 커피 브랜드 리뉴얼', en: 'Premium Coffee Brand Renewal' },
    client: 'Roast House',
    category: 'branding',
    thumbnail: '/images/portfolio/project-2.jpg',
    thumbnailAlt: 'Roast House 브랜드 리뉴얼 디자인',
    description: {
      ko: '고급스러운 원두 커피 브랜드의 전체적인 아이덴티티 리뉴얼',
      en: 'Complete identity renewal for a premium coffee bean brand',
    },
    tags: ['Branding', 'BI Design', 'Package'],
    year: 2024,
    isFeatured: true,
  },
  {
    id: 'project-3',
    title: { ko: '헬스케어 모바일 앱', en: 'Healthcare Mobile App' },
    client: 'HealthyLife',
    category: 'app',
    thumbnail: '/images/portfolio/project-3.jpg',
    thumbnailAlt: 'HealthyLife 헬스케어 앱 UI 화면',
    description: {
      ko: '사용자 친화적인 건강 관리 모바일 애플리케이션',
      en: 'User-friendly health management mobile application',
    },
    tags: ['React Native', 'UI/UX', 'Healthcare'],
    year: 2024,
    isFeatured: true,
  },
  {
    id: 'project-4',
    title: { ko: '이커머스 플랫폼 UX 개선', en: 'E-commerce Platform UX Improvement' },
    client: 'ShopEasy',
    category: 'uiux',
    thumbnail: '/images/portfolio/project-4.jpg',
    thumbnailAlt: 'ShopEasy 이커머스 UX 개선 프로젝트',
    description: {
      ko: '구매 전환율 향상을 위한 전체 UX 리디자인 프로젝트',
      en: 'Complete UX redesign project to improve conversion rates',
    },
    tags: ['UX Research', 'UI Design', 'Prototyping'],
    year: 2024,
    isFeatured: true,
  },
  {
    id: 'project-5',
    title: { ko: '금융 서비스 대시보드', en: 'Financial Services Dashboard' },
    client: 'FinTech Plus',
    category: 'web',
    thumbnail: '/images/portfolio/project-5.jpg',
    thumbnailAlt: 'FinTech Plus 금융 대시보드 화면',
    description: {
      ko: '복잡한 금융 데이터를 직관적으로 시각화한 대시보드',
      en: 'Dashboard with intuitive visualization of complex financial data',
    },
    tags: ['Vue.js', 'D3.js', 'Data Viz'],
    year: 2024,
    isFeatured: true,
  },
  {
    id: 'project-6',
    title: { ko: '교육 플랫폼 앱', en: 'Education Platform App' },
    client: 'EduSmart',
    category: 'app',
    thumbnail: '/images/portfolio/project-6.jpg',
    thumbnailAlt: 'EduSmart 교육 플랫폼 앱 화면',
    description: {
      ko: '인터랙티브한 학습 경험을 제공하는 교육 앱',
      en: 'Educational app providing interactive learning experiences',
    },
    tags: ['Flutter', 'Firebase', 'EdTech'],
    year: 2024,
    isFeatured: true,
  },
];

// -----------------------------
// Page SEO & Text
// -----------------------------
export const portfolioPageData = {
  title: {
    ko: '포트폴리오',
    en: 'Portfolio',
  },
  titleAriaLabel: 'narii lab 포트폴리오',
  subtitle: {
    ko: '클라이언트와 함께 만들어온 결과물을 확인하세요.',
    en: 'Check out the results we have created with our clients.',
  },
  filterAriaLabel: '포트폴리오 카테고리 필터',
};
