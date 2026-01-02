// ===========================================
// About Page Data (Bilingual: ko/en)
// ===========================================

import { BilingualText } from '@/types';

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: BilingualText;
  description: BilingualText;
  image: string;
}

export const aboutData = {
  hero: {
    title: {
      ko: '의미 있는 아이디어를,\n좋은 경험으로 만듭니다.',
      en: 'We turn meaningful ideas\ninto great experiences.',
    },
    description: {
      ko: `narii lab은 크리에이티브를 통해
브랜드와 사용자를 자연스럽게 연결합니다.

우리는 사용자를 '관점'이 아닌
하나의 삶으로 바라보는 데서 디자인을 시작합니다.
더 나은 경험이, 더 나은 일상으로 이어질 수 있도록
충분히 듣고 함께 고민합니다.

그 과정을 통해
성장하는 방향을 설계하고,
소통을 바탕으로 한 디자인과
계속해서 진화하는 경험을 만들어갑니다.`,
      en: `narii lab naturally connects
brands and users through creativity.

We start design by viewing users
not as a 'perspective' but as a life.
We listen fully and think together
so that better experiences lead to better daily lives.

Through this process,
we design directions for growth,
create design based on communication,
and build experiences that continue to evolve.`,
    },
  },

  services: {
    title: {
      ko: 'What We Do',
      en: 'What We Do',
    },
    items: [
      {
        id: 'branding',
        title: 'Branding',
        subtitle: {
          ko: '브랜드의 본질을 담다',
          en: 'Capturing the essence of brand',
        },
        description: {
          ko: '브랜드 아이덴티티는 단순한 로고나 색상이 아닙니다. 우리는 브랜드의 철학, 가치, 그리고 고객과의 약속을 시각적 언어로 번역합니다. 일관된 브랜드 경험을 통해 고객의 마음에 오래 남는 인상을 만들어냅니다.',
          en: 'Brand identity is more than just a logo or colors. We translate brand philosophy, values, and promises to customers into visual language. Through consistent brand experiences, we create lasting impressions in customers\' minds.',
        },
        image: '/images/about/branding.jpg',
      },
      {
        id: 'planning',
        title: 'Planning',
        subtitle: {
          ko: '사용자 중심의 설계',
          en: 'User-centered design',
        },
        description: {
          ko: '좋은 기획은 사용자를 깊이 이해하는 것에서 시작됩니다. 사용자 리서치, 데이터 분석, 그리고 비즈니스 목표를 종합하여 최적의 서비스 구조와 사용자 여정을 설계합니다. 모든 결정에는 명확한 근거가 있습니다.',
          en: 'Good planning starts with deep understanding of users. We combine user research, data analysis, and business goals to design optimal service structures and user journeys. Every decision has clear rationale.',
        },
        image: '/images/about/planning.jpg',
      },
      {
        id: 'design',
        title: 'Design',
        subtitle: {
          ko: '아름다움과 기능의 조화',
          en: 'Harmony of beauty and function',
        },
        description: {
          ko: '우리는 미적 완성도와 사용성 사이에서 균형을 찾습니다. 직관적인 인터페이스, 섬세한 인터랙션, 그리고 일관된 디자인 시스템을 통해 사용자가 자연스럽게 몰입할 수 있는 경험을 만들어냅니다.',
          en: 'We find balance between aesthetic perfection and usability. Through intuitive interfaces, delicate interactions, and consistent design systems, we create experiences where users naturally become immersed.',
        },
        image: '/images/about/design.jpg',
      },
      {
        id: 'development',
        title: 'Development',
        subtitle: {
          ko: '기술로 가치를 실현',
          en: 'Realizing value through technology',
        },
        description: {
          ko: '최신 기술 스택과 검증된 아키텍처로 안정적이고 확장 가능한 솔루션을 구축합니다. 성능 최적화, 접근성, 그리고 유지보수성을 모두 고려하여 오래 사용할 수 있는 제품을 만듭니다.',
          en: 'We build stable and scalable solutions with the latest technology stack and proven architecture. Considering performance optimization, accessibility, and maintainability, we create products that last.',
        },
        image: '/images/about/development.jpg',
      },
    ] as ServiceItem[],
  },

  cta: {
    title: {
      ko: '프로젝트를 시작해볼까요?',
      en: 'Ready to start a project?',
    },
    description: {
      ko: '아이디어를 현실로 만들어 드립니다.\n지금 바로 상담을 시작하세요.',
      en: 'We turn your ideas into reality.\nStart a consultation now.',
    },
    button: {
      ko: '프로젝트 문의하기',
      en: 'Contact Us',
    },
  },
};
