// ===========================================
// useIntersectionObserver Hook
// 스크롤 기반 요소 가시성 감지
// ===========================================

import { RefObject, useEffect, useState } from 'react';

// -----------------------------
// Types
// -----------------------------
interface UseIntersectionObserverOptions {
  /** 가시성 임계값 (0-1) */
  threshold?: number;
  /** 루트 마진 */
  rootMargin?: string;
  /** 한 번만 트리거할지 여부 */
  triggerOnce?: boolean;
}

// -----------------------------
// Hook
// -----------------------------
export const useIntersectionObserver = (
  ref: RefObject<Element | null>,
  options: UseIntersectionObserverOptions = {}
): boolean => {
  const {
    threshold = 0,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // 한 번만 트리거하는 경우 관찰 중단
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, triggerOnce]);

  return isIntersecting;
};
