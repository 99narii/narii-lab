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
      ko: '의미 있는 아이디어를,\n가치있는 경험으로 만듭니다.',
      en: 'We turn meaningful ideas\ninto great experiences.',
    },
    description: {
      ko: `사용자의 생각과 의견에 귀 기울이는 것으로 부터 시작하여
브랜드와 사용자를 자연스럽게 연결합니다.

사용자를 애정하는 마음에서부터가 비즈니스의 시작이라고 생각합니다.
더 나은 경험이, 더 나은 일상으로 이어질 수 있도록
충분히 듣고 함께 고민합니다.

그 과정을 통해
성장하는 방향을 설계하고,
소통을 바탕으로 한 디자인과
계속해서 개선하는 경험을 만들어갑니다.`,
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
          en: 'Capturing the Essence',
        },
        description: {
          ko: '이 서비스가 "왜" 필요한지, 근본적인 이유에서부터 시작합니다.\n사용자의 기억에 남는 서비스를 만들어내기 위해 브랜드의 입장에서, 소비자의 입장에서 지속적으로 고민합니다.',
          en: 'We start by asking "why" this service is necessary. To create a lasting impression, we constantly look at the product from both the brand\'s vision and the consumer\'s perspective.',
        },
        image: '/images/about/branding.jpg',
      },
      {
        id: 'planning',
        title: 'Template',
        subtitle: {
          ko: '확장성을 고려한 모듈화 설계',
          en: 'Scalable Modular Design',
        },
        description: {
          ko: 'Why?\n서비스는 지속적으로 변화하고 성장합니다. 유지보수에 용이한 설계를 고려하지 않으면 기능 추가나 작은 수정에도 서비스 전체가 흔들릴 수 있습니다.\nHow?\nUI-컴포넌트-섹션-페이지 단위로 템플릿화하는 방식을 선호합니다. 반복 작업 등의 불필요한 리소스를 줄여 사용성과 퀄리티를 높이는 데 집중합니다.',
          en: 'Why?\nServices evolve and grow. Without maintenance-friendly design, even small changes can compromise the whole system.\nHow?\nWe prefer modularizing into UI-Component-Section-Page units. By minimizing repetitive tasks, we focus on enhancing usability and overall quality.',
        },
        image: '/images/about/planning.jpg',
      },
      {
        id: 'design',
        title: 'Design Tokens',
        subtitle: {
          ko: '일관적이며 유연한 대응',
          en: 'Consistent & Flexible Systems',
        },
        description: {
          ko: '테마 변경, 디자인 변경, 템플릿 활용에도 유연하게 대응할 수 있도록 디자인 토큰화를 적용하여 탄탄한 UI 설계를 지향합니다.',
          en: 'We prioritize robust UI design through tokenization. This allows us to respond flexibly to theme changes, design updates, and template reuse while maintaining a solid structure.',
        },
        image: '/images/about/design.jpg',
      },
      {
        id: 'development',
        title: 'Development',
        subtitle: {
          ko: '기본에 충실한 설계',
          en: 'Architecture Faithful to the Basics',
        },
        description: {
          ko: '"개발을 넘어, 서비스의 도메인에 맞는 최적의 설계 전략을 선택합니다."\n웹 접근성: 언제 어디서든 사각지대가 생기지 않도록 기능을 온전히 누릴 수 있는 서비스를 구축합니다.\nSEO/AEO/GEO: 서비스의 성격에 맞춰 마케팅에도 활용할 수 있는 구조적 기틀을 만듭니다.',
          en: 'Beyond simple coding, we choose the optimal strategy for the specific domain.\nAccessibility: We build services where everyone can fully enjoy features without any blind spots.\nSEO/AEO/GEO: We create a structural foundation that can be utilized for marketing, tailored to the unique nature of each service.',
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
