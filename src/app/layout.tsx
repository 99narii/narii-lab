import type { Metadata } from 'next';
import { Providers } from '@/components/common';
import './globals.scss';

// -----------------------------
// Metadata
// -----------------------------
export const metadata: Metadata = {
  title: 'narii lab | 웹 에이전시',
  description: '브랜딩, 기획, 디자인, 개발까지. 당신의 비즈니스를 디지털로 완성합니다.',
  keywords: ['웹 에이전시', '웹 개발', 'UI/UX 디자인', '브랜딩', '앱 개발'],
  authors: [{ name: 'narii lab' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'narii lab',
    title: 'narii lab | 웹 에이전시',
    description: '브랜딩, 기획, 디자인, 개발까지. 당신의 비즈니스를 디지털로 완성합니다.',
  },
};

// -----------------------------
// Root Layout
// -----------------------------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* Pretendard Font */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        {/* Gmarket Sans Font */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.css"
        />
      </head>
      <body>
        <Providers>
          {/* Skip Link for Accessibility */}
          <a href="#main-content" className="skip-link">
            본문으로 바로가기
          </a>
          {children}
        </Providers>
      </body>
    </html>
  );
}
