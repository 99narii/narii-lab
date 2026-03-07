'use client';

// ===========================================
// Admin Portfolios Page
// 포트폴리오 목록 관리 페이지
// ===========================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase, type Portfolio } from '@/lib/supabase';
import styles from './page.module.scss';

export default function AdminPortfoliosPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 포트폴리오 목록 가져오기
  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPortfolios(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 포트폴리오 삭제
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" 포트폴리오를 삭제하시겠습니까?`)) return;

    try {
      const { error } = await supabase.from('portfolios').delete().eq('id', id);
      if (error) throw error;
      setPortfolios((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : '삭제에 실패했습니다.');
    }
  };

  // 발행 상태 토글
  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('portfolios')
        .update({ published: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      setPortfolios((prev) =>
        prev.map((p) => (p.id === id ? { ...p, published: !currentStatus } : p))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : '상태 변경에 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={fetchPortfolios}>다시 시도</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Portfolios</h1>
          <p className={styles.subtitle}>총 {portfolios.length}개의 포트폴리오</p>
        </div>
        <Link href="/admin/portfolios/new" className={styles.addButton}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>새 포트폴리오</span>
        </Link>
      </header>

      {/* Portfolio List */}
      {portfolios.length === 0 ? (
        <div className={styles.empty}>
          <p>등록된 포트폴리오가 없습니다.</p>
          <Link href="/admin/portfolios/new" className={styles.emptyLink}>
            첫 번째 포트폴리오 추가하기
          </Link>
        </div>
      ) : (
        <div className={styles.list}>
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} className={styles.item}>
              {/* Thumbnail */}
              <div className={styles.thumbnail}>
                {portfolio.thumbnail_url ? (
                  <img src={portfolio.thumbnail_url} alt={portfolio.title} />
                ) : (
                  <div className={styles.placeholder}>No Image</div>
                )}
              </div>

              {/* Info */}
              <div className={styles.info}>
                <h3 className={styles.itemTitle}>{portfolio.title}</h3>
                <p className={styles.itemMeta}>
                  <span className={styles.category}>{portfolio.category}</span>
                  {portfolio.client && (
                    <span className={styles.client}>{portfolio.client}</span>
                  )}
                </p>
              </div>

              {/* Status & Actions */}
              <div className={styles.statusActions}>
                <button
                  className={`${styles.status} ${portfolio.published ? styles.published : styles.draft}`}
                  onClick={() => handleTogglePublish(portfolio.id, portfolio.published)}
                >
                  {portfolio.published ? '발행됨' : '초안'}
                </button>

                <div className={styles.actions}>
                  <Link
                    href={`/admin/portfolios/${portfolio.id}`}
                    className={styles.editButton}
                  >
                    수정
                  </Link>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(portfolio.id, portfolio.title)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
