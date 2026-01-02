// ===========================================
// Home Page Data (Bilingual: ko/en)
// SEO/접근성은 한국어 기준
// ===========================================

import type { ServiceItem, PersuasionItem, CTAButton } from '@/types';

export const homeData = {
  // -----------------------------
  // Cover Animation
  // -----------------------------
  cover: {
    brandName: 'narii lab',
    tagline: {
      ko: '디자인과 기술의 만남',
      en: 'Where Design Meets Technology',
    },
    ariaLabel: 'narii lab 로고 애니메이션',
  },

  // -----------------------------
  // Hero Section
  // -----------------------------
  hero: {
    title: {
      ko: 'We design with intention',
      en: 'We design with intention',
    },
    titleAriaLabel: '당신의 비즈니스를 디지털로 완성합니다',
    services: [
      { id: 'branding', text: 'branding', delay: 0 },
      { id: 'plan', text: 'plan', delay: 200 },
      { id: 'design', text: 'design', delay: 400 },
      { id: 'develop', text: 'develop', delay: 600 },
    ] as ServiceItem[],
    cta: {
      primary: {
        text: {
          ko: '프로젝트 시작하기',
          en: 'Start Project',
        },
        href: '/estimate',
        ariaLabel: '간편견적 페이지로 이동하여 프로젝트 시작하기',
      },
      secondary: {
        text: {
          ko: '포트폴리오 보기',
          en: 'View Portfolio',
        },
        href: '/portfolio',
        ariaLabel: '포트폴리오 페이지에서 작업물 확인하기',
      },
    },
  },

  // -----------------------------
  // Persuasion Section
  // -----------------------------
  persuasion: {
    title: {
      ko: '왜 narii lab인가요?',
      en: 'Why narii lab?',
    },
    titleAriaLabel: '왜 narii lab을 선택해야 하는지 알아보세요',
    subtitle: {
      ko: '우리는 단순한 제작을 넘어, 비즈니스의 성장을 함께 고민합니다.',
      en: 'We go beyond simple production to think together about business growth.',
    },
    items: [
      {
        id: 'experience',
        title: {
          ko: '풍부한 경험',
          en: 'Rich Experience',
        },
        description: {
          ko: '다양한 산업군의 프로젝트 경험으로\n최적의 솔루션을 제공합니다.',
          en: 'We provide optimal solutions\nwith diverse industry project experience.',
        },
        icon: 'experience',
      },
      {
        id: 'quality',
        title: {
          ko: '품질 우선',
          en: 'Quality First',
        },
        description: {
          ko: '트렌드를 따르되, 본질에 집중한\n디자인과 개발을 추구합니다.',
          en: 'We follow trends while focusing\non essential design and development.',
        },
        icon: 'quality',
      },
      {
        id: 'communication',
        title: {
          ko: '원활한 소통',
          en: 'Smooth Communication',
        },
        description: {
          ko: '프로젝트 전 과정에서 투명하고\n신속한 커뮤니케이션을 약속합니다.',
          en: 'We promise transparent and\nprompt communication throughout.',
        },
        icon: 'communication',
      },
    ] as PersuasionItem[],
  },

  // -----------------------------
  // Portfolio Preview Section
  // -----------------------------
  portfolioPreview: {
    title: {
      ko: '최근 프로젝트',
      en: 'Recent Projects',
    },
    titleAriaLabel: '최근 완료한 프로젝트 미리보기',
    subtitle: {
      ko: '클라이언트와 함께 만든 결과물',
      en: 'Results created with our clients',
    },
    viewAllText: {
      ko: '전체 포트폴리오 보기',
      en: 'View All Portfolio',
    },
    viewAllHref: '/portfolio',
    viewAllAriaLabel: '포트폴리오 전체 목록 페이지로 이동',
  },

  // -----------------------------
  // Contact Section
  // -----------------------------
  contact: {
    title: {
      ko: '프로젝트를 시작해볼까요?',
      en: "Let's Start Your Project?",
    },
    titleAriaLabel: '프로젝트 문의하기',
    description: {
      ko: '아이디어가 있으시다면 편하게 연락주세요.\n함께 멋진 결과물을 만들어 드리겠습니다.',
      en: "If you have an idea, feel free to contact us.\nWe'll create amazing results together.",
    },
    cta: {
      text: {
        ko: '문의하기',
        en: 'Contact Us',
      },
      href: '/contact',
      ariaLabel: '연락하기 페이지로 이동하여 문의하기',
    } as CTAButton,
    email: {
      address: 'hello@nariilab.com',
      ariaLabel: 'narii lab 이메일 주소',
    },
  },
};
