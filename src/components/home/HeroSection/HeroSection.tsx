'use client';

// ===========================================
// HeroSection Component
// 메인 히어로 섹션 (스크롤 잠금 + 순차 텍스트 등장)
// ===========================================

import { useRef, useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts';
import { homeData } from '@/data/home';
import { Button } from '@/components/common';
import styles from './HeroSection.module.scss';

// -----------------------------
// Component
// -----------------------------
export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const { hero } = homeData;

  // 스크롤에 따라 나타나는 서비스 아이템 인덱스
  const [visibleCount, setVisibleCount] = useState(0);
  // 모든 서비스가 나타났는지 여부
  const [allVisible, setAllVisible] = useState(false);
  // 스크롤 잠금 해제 여부
  const [isUnlocked, setIsUnlocked] = useState(false);
  // 보드 표시 여부
  const [isBoardVisible, setIsBoardVisible] = useState(false);
  // 휠 이벤트 쿨다운 (연속 스크롤 방지)
  const [canScroll, setCanScroll] = useState(true);
  // 휠 누적값
  const wheelAccumulatorRef = useRef(0);
  // 타이틀 애니메이션 활성화 여부
  const [isTitleAnimating, setIsTitleAnimating] = useState(true);
  // 모바일 여부
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일: 자동 시간차 등장 (1초 간격)
  useEffect(() => {
    if (isMobile && isBoardVisible) {
      hero.services.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCount(prev => Math.max(prev, index + 1));
          if (index === hero.services.length - 1) {
            setAllVisible(true);
            setIsUnlocked(true);
          }
        }, 500 + index * 1000); // 0.5초 후 시작, 1초 간격
      });
    }
  }, [isMobile, isBoardVisible, hero.services]);

  // 휠 이벤트로 순차 등장 제어 - 딜레이 추가
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isUnlocked) return;

    e.preventDefault();

    // 아래로 스크롤할 때만 처리
    if (e.deltaY > 0 && canScroll) {
      // 휠 누적값 증가
      wheelAccumulatorRef.current += e.deltaY;

      // 누적값이 임계치(300)를 넘으면 다음 아이템 표시
      if (wheelAccumulatorRef.current >= 50) {
        wheelAccumulatorRef.current = 0;
        setCanScroll(false);

        setVisibleCount((prev) => {
          const next = prev + 1;
          if (next >= hero.services.length) {
            setAllVisible(true);
            // 마지막 아이템 후 잠금 해제
            setTimeout(() => {
              setIsUnlocked(true);
            }, 800);
            return hero.services.length;
          }
          return next;
        });

        // 쿨다운: 600ms 후에 다시 스크롤 가능
        setTimeout(() => {
          setCanScroll(true);
        }, 600);
      }
    }
  }, [isUnlocked, canScroll, hero.services.length]);

  // 휠 이벤트 리스너 등록 (데스크탑만)
  useEffect(() => {
    if (!isUnlocked && !isMobile) {
      window.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel, isUnlocked, isMobile]);

  // 보드 등장 애니메이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBoardVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // 타이틀 애니메이션 5초 후 종료
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTitleAnimating(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // 스크롤 잠금/해제 (데스크탑만)
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = '';
      return;
    }

    if (isUnlocked) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isUnlocked, isMobile]);

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      aria-labelledby="hero-title"
    >
      {/* 보드 컨테이너 - 전체 화면 */}
      <div className={`${styles.board} ${isBoardVisible ? styles.visible : ''}`}>
        <div className={styles.content}>
          {/* 메인 타이틀 - 글자별 씰룩쌜룩 애니메이션 */}
          <h1
            id="hero-title"
            className={`${styles.title} ${isTitleAnimating ? styles.titleAnimating : ''}`}
            aria-label={hero.titleAriaLabel}
          >
            {t(hero.title).split('\n').map((line: string, lineIndex: number) => (
              <span key={lineIndex} className={styles.titleLine}>
                {line.split('').map((char: string, charIndex: number) => (
                  <span
                    key={charIndex}
                    className={styles.titleChar}
                    style={{
                      animationDelay: `${(lineIndex * line.length + charIndex) * 80}ms`,
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* 서비스 키워드 리스트 - 스크롤 기반 순차 등장 */}
          <ul
            className={styles.serviceList}
            role="list"
            aria-label="제공 서비스"
          >
            {hero.services.map((service, index) => (
              <li
                key={service.id}
                className={`${styles.serviceItem} ${index < visibleCount ? styles.serviceVisible : ''}`}
              >
                {service.text}
              </li>
            ))}
          </ul>

          {/* CTA 버튼 그룹 - 모든 서비스 표시 후 등장 */}
          <div className={`${styles.ctaGroup} ${allVisible ? styles.ctaVisible : ''}`}>
            <Button
              variant="primary"
              size="lg"
              href={hero.cta.primary.href}
              ariaLabel={hero.cta.primary.ariaLabel}
            >
              {t(hero.cta.primary.text)}
            </Button>
            <Button
              variant="outline"
              size="lg"
              href={hero.cta.secondary.href}
              ariaLabel={hero.cta.secondary.ariaLabel}
            >
              {t(hero.cta.secondary.text)}
            </Button>
          </div>
        </div>

        {/* 스크롤 유도 표시 - 서비스가 다 안 나왔을 때만 */}
        {!allVisible && isBoardVisible && (
          <div className={styles.scrollHint} aria-hidden="true">
            <span className={styles.scrollText}>scroll</span>
            <span className={styles.scrollArrow}>↓</span>
          </div>
        )}
      </div>
    </section>
  );
};
