'use client';

// ===========================================
// Home Page
// 메인 페이지
// ===========================================

import { useState } from 'react';
import { Header, Footer } from '@/components/common';
import {
  CoverAnimation,
  HeroSection,
  PersuasionSection,
  PortfolioPreview,
  ContactSection,
} from '@/components/home';
import styles from './page.module.scss';

// -----------------------------
// Component
// -----------------------------
export default function HomePage() {
  // 커버 애니메이션 완료 상태
  const [isCoverComplete, setIsCoverComplete] = useState(false);

  // 커버 애니메이션 완료 핸들러
  const handleCoverComplete = () => {
    setIsCoverComplete(true);
  };

  return (
    <>
      {/* 커버 애니메이션 */}
      {!isCoverComplete && (
        <CoverAnimation onComplete={handleCoverComplete} />
      )}

      {/* 메인 콘텐츠 */}
      <div
        className={`${styles.wrapper} ${isCoverComplete ? styles.visible : ''}`}
      >
        {/* 헤더 */}
        <Header />

        {/* 메인 콘텐츠 영역 */}
        <main id="main-content">
          {/* Hero 섹션 */}
          <HeroSection />

          {/* 설득 섹션 */}
          <PersuasionSection />

          {/* 포트폴리오 미리보기 섹션 */}
          <PortfolioPreview />

          {/* 연락하기 CTA 섹션 */}
          <ContactSection />
        </main>

        {/* 푸터 */}
        <Footer />
      </div>
    </>
  );
}
