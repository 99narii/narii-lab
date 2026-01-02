// ===========================================
// Estimate Page Data (Bilingual: ko/en) - 전면 개편
// ===========================================

import { BilingualText } from '@/types';

// -----------------------------
// Option Types
// -----------------------------
export interface EstimateOption {
  id: string;
  label: BilingualText;
}

export interface EstimateSelectOption {
  value: string;
  label: BilingualText;
}

// -----------------------------
// Estimate Data
// -----------------------------
export const estimateData = {
  hero: {
    title: {
      ko: '간편견적',
      en: 'Quick Estimate',
    },
    subtitle: {
      ko: '프로젝트에 대해 알려주세요. 맞춤 견적을 빠르게 안내해드립니다.',
      en: 'Tell us about your project. We will provide a customized estimate quickly.',
    },
  },

  // 동적 텍스트 템플릿
  dynamicText: {
    template: {
      ko: `{field}
{platform}의
{type} 프로젝트를
의뢰하고 싶어요.

{budget}의 규모로
{duration} 동안 진행할
예정입니다.`,
      en: `I want to request
a {type} project
for {field}
{platform}.

With a budget of {budget},
planning to proceed
for {duration}.`,
    },
    placeholders: {
      field: { ko: '분야', en: 'Field' },
      platform: { ko: '프로젝트 형태', en: 'Platform' },
      type: { ko: '프로젝트 성격', en: 'Project Type' },
      budget: { ko: '프로젝트 예산', en: 'Budget' },
      duration: { ko: '프로젝트 기간', en: 'Duration' },
    },
  },

  // 옵션들
  options: {
    // 분야
    field: {
      label: { ko: '분야', en: 'Field' },
      items: [
        { id: 'brand', label: { ko: '브랜드', en: 'Brand' } },
        { id: 'media', label: { ko: '미디어', en: 'Media' } },
        { id: 'o2o', label: { ko: 'O2O', en: 'O2O' } },
        { id: 'ecommerce', label: { ko: '이커머스', en: 'E-commerce' } },
        { id: 'finance', label: { ko: '금융', en: 'Finance' } },
        { id: 'beauty', label: { ko: '뷰티', en: 'Beauty' } },
        { id: 'entertainment', label: { ko: '연예/기획', en: 'Entertainment' } },
        { id: 'living', label: { ko: '리빙', en: 'Living' } },
        { id: 'other', label: { ko: '기타', en: 'Other' } },
      ] as EstimateOption[],
    },

    // 프로젝트 범위
    scope: {
      label: { ko: '프로젝트 범위', en: 'Project Scope' },
      items: [
        { id: 'full', label: { ko: '브랜딩부터 개발까지', en: 'Branding to Development' } },
        { id: 'design-dev', label: { ko: '디자인부터 개발까지', en: 'Design to Development' } },
        { id: 'dev-only', label: { ko: '개발', en: 'Development Only' } },
      ] as EstimateOption[],
    },

    // 프로젝트 형태
    platform: {
      label: { ko: '프로젝트 형태', en: 'Platform' },
      items: [
        { id: 'pc-web', label: { ko: 'PC 웹', en: 'PC Web' } },
        { id: 'mobile-web', label: { ko: '모바일 웹', en: 'Mobile Web' } },
        { id: 'app', label: { ko: '앱', en: 'App' } },
        { id: 'responsive', label: { ko: '반응형', en: 'Responsive' } },
      ] as EstimateOption[],
    },

    // 프로젝트 성격
    type: {
      label: { ko: '프로젝트 성격', en: 'Project Type' },
      items: [
        { id: 'new', label: { ko: '신규', en: 'New' } },
        { id: 'renewal', label: { ko: '리뉴얼', en: 'Renewal' } },
        { id: 'maintenance', label: { ko: '유지보수', en: 'Maintenance' } },
        { id: 'other', label: { ko: '기타', en: 'Other' } },
      ] as EstimateOption[],
    },

    // 예산 범위
    budget: {
      label: { ko: '예산 범위', en: 'Budget Range' },
      items: [
        { id: 'under-1000', label: { ko: '1,000만원 이하', en: 'Under $10K' } },
        { id: '1000-3000', label: { ko: '1,000만원 ~ 3,000만원', en: '$10K - $30K' } },
        { id: '3000-5000', label: { ko: '3,000만원 ~ 5,000만원', en: '$30K - $50K' } },
        { id: '5000-1억', label: { ko: '5,000만원 ~ 1억', en: '$50K - $100K' } },
        { id: 'over-1억', label: { ko: '1억 이상', en: 'Over $100K' } },
      ] as EstimateOption[],
    },

    // 프로젝트 기간 (개월 단위 셀렉트)
    duration: {
      label: { ko: '프로젝트 기간', en: 'Duration' },
      items: [
        { value: '2', label: { ko: '2개월', en: '2 months' } },
        { value: '3', label: { ko: '3개월', en: '3 months' } },
        { value: '4', label: { ko: '4개월', en: '4 months' } },
        { value: '5', label: { ko: '5개월', en: '5 months' } },
        { value: '6', label: { ko: '6개월', en: '6 months' } },
        { value: '7', label: { ko: '7개월', en: '7 months' } },
        { value: '8', label: { ko: '8개월', en: '8 months' } },
        { value: '9', label: { ko: '9개월', en: '9 months' } },
        { value: '10', label: { ko: '10개월', en: '10 months' } },
        { value: '11', label: { ko: '11개월', en: '11 months' } },
        { value: '12', label: { ko: '12개월', en: '12 months' } },
        { value: '12+', label: { ko: '1년 이상', en: 'Over 1 year' } },
      ] as EstimateSelectOption[],
    },
  },

  // 결과
  result: {
    title: {
      ko: '예상 견적',
      en: 'Estimated Cost',
    },
    calculating: {
      ko: '옵션을 선택해주세요',
      en: 'Please select options',
    },
    disclaimer: {
      ko: '* 실제 견적은 상담 후 확정됩니다.',
      en: '* Final quote will be confirmed after consultation.',
    },
  },

  // 버튼
  buttons: {
    check: {
      ko: '간편견적 확인',
      en: 'Check Estimate',
    },
    contact: {
      ko: '문의하기',
      en: 'Contact Us',
    },
    reset: {
      ko: '다시 선택',
      en: 'Reset',
    },
  },

  // 연락처 폼 (견적 확인 후)
  contactForm: {
    name: {
      label: { ko: '이름 / 회사명', en: 'Name / Company' },
      placeholder: { ko: '홍길동', en: 'John Doe' },
      error: { ko: '이름을 입력해주세요', en: 'Please enter your name' },
    },
    email: {
      label: { ko: '이메일', en: 'Email' },
      placeholder: 'example@email.com',
      error: { ko: '올바른 이메일 주소를 입력해주세요', en: 'Please enter a valid email' },
    },
    phone: {
      label: { ko: '연락처', en: 'Phone' },
      placeholder: '010-0000-0000',
      error: { ko: '연락처를 입력해주세요', en: 'Please enter your phone' },
    },
    message: {
      label: { ko: '추가 요청사항', en: 'Additional Notes' },
      placeholder: { ko: '프로젝트에 대해 추가로 알려주세요', en: 'Tell us more about your project' },
    },
    submit: {
      default: { ko: '문의하기', en: 'Submit' },
      submitting: { ko: '전송 중...', en: 'Submitting...' },
    },
    success: {
      ko: '문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.',
      en: 'Your inquiry has been submitted. We will contact you soon.',
    },
  },
};

// 견적 계산 함수 (상세 로직)
export const calculateEstimate = (selections: {
  field?: string;
  scope?: string;
  platform?: string;
  type?: string;
  budget?: string;
  duration?: string;
}): { min: number; max: number } | null => {
  // 모든 필수 항목이 선택되었는지 확인
  if (!selections.field || !selections.scope || !selections.platform ||
      !selections.type || !selections.budget || !selections.duration) {
    return null;
  }

  // 기본 가격 (범위별 기본 단가 - 만원 단위)
  const scopePrices: Record<string, { min: number; max: number }> = {
    'full': { min: 3000, max: 8000 },      // 브랜딩부터 개발까지
    'design-dev': { min: 2000, max: 5000 }, // 디자인부터 개발까지
    'dev-only': { min: 1000, max: 3000 },   // 개발만
  };

  // 플랫폼별 가중치
  const platformMultiplier: Record<string, number> = {
    'pc-web': 1.0,
    'mobile-web': 1.0,
    'app': 1.5,
    'responsive': 1.3,
  };

  // 프로젝트 성격별 가중치
  const typeMultiplier: Record<string, number> = {
    'new': 1.0,
    'renewal': 0.8,
    'maintenance': 0.5,
    'other': 0.7,
  };

  // 기간별 가중치 (짧을수록 비용 증가)
  const durationMultiplier: Record<string, number> = {
    '2': 1.3,
    '3': 1.2,
    '4': 1.1,
    '5': 1.0,
    '6': 1.0,
    '7': 0.95,
    '8': 0.95,
    '9': 0.9,
    '10': 0.9,
    '11': 0.85,
    '12': 0.85,
    '12+': 0.8,
  };

  const basePrice = scopePrices[selections.scope] || { min: 2000, max: 5000 };
  const platform = platformMultiplier[selections.platform] || 1.0;
  const type = typeMultiplier[selections.type] || 1.0;
  const duration = durationMultiplier[selections.duration] || 1.0;

  // 최종 계산
  const minPrice = Math.round(basePrice.min * platform * type * duration);
  const maxPrice = Math.round(basePrice.max * platform * type * duration);

  return { min: minPrice, max: maxPrice };
};

// 가격 포맷 함수
export const formatPrice = (price: number, language: 'ko' | 'en'): string => {
  if (language === 'ko') {
    if (price >= 10000) {
      return `${(price / 10000).toFixed(1)}억원`;
    }
    return `${price.toLocaleString()}만원`;
  } else {
    const usdPrice = price * 100; // 만원 → 달러 (대략적 환산)
    if (usdPrice >= 1000000) {
      return `$${(usdPrice / 1000000).toFixed(1)}M`;
    }
    return `$${(usdPrice / 1000).toFixed(0)}K`;
  }
};
