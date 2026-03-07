// ===========================================
// Contact Page Data (Bilingual: ko/en)
// ===========================================

export const contactData = {
  hero: {
    title: {
      ko: '연락하기',
      en: 'Contact',
    },
    subtitle: {
      ko: '프로젝트 문의부터 간단한 질문까지, 편하게 연락주세요.',
      en: 'From project inquiries to simple questions, feel free to contact us.',
    },
  },

  info: {
    title: {
      ko: 'Contact Info',
      en: 'Contact Info',
    },
    email: {
      label: 'Email',
      value: '99studio99@naver.com',
    },
    response: {
      label: 'Response Time',
      value: {
        ko: '영업일 기준 24시간 이내 답변',
        en: 'Response within 24 hours on business days',
      },
    },
    hours: {
      label: 'Working Hours',
      value: {
        ko: '월 - 금, 10:00 - 19:00',
        en: 'Mon - Fri, 10:00 - 19:00',
      },
    },
  },

  form: {
    name: {
      label: {
        ko: '이름 / 회사명',
        en: 'Name / Company',
      },
      placeholder: {
        ko: '홍길동',
        en: 'John Doe',
      },
      error: {
        ko: '이름은 1~20자로 입력해주세요',
        en: 'Name must be 1-20 characters',
      },
    },
    email: {
      label: {
        ko: '이메일',
        en: 'Email',
      },
      placeholder: 'example@email.com',
      error: {
        ko: '올바른 이메일 주소를 입력해주세요',
        en: 'Please enter a valid email address',
      },
    },
    phone: {
      label: {
        ko: '연락처 (선택)',
        en: 'Phone (Optional)',
      },
      placeholder: '010-0000-0000',
      error: {
        ko: '올바른 연락처를 입력해주세요 (0으로 시작, 9~11자리)',
        en: 'Please enter a valid phone number (starts with 0, 9-11 digits)',
      },
    },
    message: {
      label: {
        ko: '문의 내용',
        en: 'Message',
      },
      placeholder: {
        ko: '문의하실 내용을 입력해주세요.',
        en: 'Please enter your message.',
      },
      error: {
        ko: '문의 내용을 10자 이상 입력해주세요',
        en: 'Please enter at least 10 characters',
      },
    },
    submit: {
      default: {
        ko: '문의하기',
        en: 'Send Message',
      },
      submitting: {
        ko: '전송 중...',
        en: 'Sending...',
      },
    },
    success: {
      ko: '문의가 접수되었습니다.\n빠른 시일 내에 답변드리겠습니다.',
      en: 'Your message has been submitted.\nWe will reply soon.',
    },
  },
};
