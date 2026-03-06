'use client';

// ===========================================
// TechStackSelect Component
// 기술스택 다중 선택 칩 컴포넌트
// ===========================================

import { useState, useEffect } from 'react';
import { supabase, type TechStack } from '@/lib/supabase';
import styles from './TechStackSelect.module.scss';

// -----------------------------
// Types
// -----------------------------
interface TechStackSelectProps {
  /** 선택된 기술스택 ID 배열 */
  value: string[];
  /** 변경 핸들러 */
  onChange: (ids: string[]) => void;
  /** 라벨 */
  label?: string;
}

// -----------------------------
// Component
// -----------------------------
export const TechStackSelect = ({
  value = [],
  onChange,
  label = '기술스택',
}: TechStackSelectProps) => {
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const [loading, setLoading] = useState(true);

  // 기술스택 목록 가져오기
  useEffect(() => {
    const fetchTechStacks = async () => {
      try {
        const { data, error } = await supabase
          .from('tech_stacks')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;
        setTechStacks(data || []);
      } catch (err) {
        console.error('Failed to fetch tech stacks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTechStacks();
  }, []);

  // 칩 토글
  const handleToggle = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  if (loading) {
    return (
      <div className={styles.field}>
        <span className={styles.label}>{label}</span>
        <div className={styles.loading}>로딩 중...</div>
      </div>
    );
  }

  if (techStacks.length === 0) {
    return (
      <div className={styles.field}>
        <span className={styles.label}>{label}</span>
        <p className={styles.empty}>
          등록된 기술스택이 없습니다.{' '}
          <a href="/admin/tech-stacks" className={styles.link}>
            기술스택 추가하기
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      <div className={styles.chips}>
        {techStacks.map((stack) => {
          const isSelected = value.includes(stack.id);
          return (
            <button
              key={stack.id}
              type="button"
              className={`${styles.chip} ${isSelected ? styles.selected : ''}`}
              onClick={() => handleToggle(stack.id)}
              aria-pressed={isSelected}
            >
              {stack.name}
              {isSelected && (
                <svg
                  className={styles.checkIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
      {value.length > 0 && (
        <p className={styles.count}>{value.length}개 선택됨</p>
      )}
    </div>
  );
};
