'use client';

// ===========================================
// Admin Inquiries Page
// 문의 목록 관리 페이지
// ===========================================

import { useState, useEffect } from 'react';
import { supabase, type Inquiry } from '@/lib/supabase';
import styles from './page.module.scss';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // 문의 목록 가져오기
  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 읽음 상태 토글
  const handleToggleRead = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ is_read: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, is_read: !currentStatus } : i))
      );
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, is_read: !currentStatus });
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : '상태 변경에 실패했습니다.');
    }
  };

  // 문의 삭제
  const handleDelete = async (id: string) => {
    if (!confirm('이 문의를 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase.from('inquiries').delete().eq('id', id);
      if (error) throw error;
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : '삭제에 실패했습니다.');
    }
  };

  // 문의 선택 (상세 보기)
  const handleSelect = async (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    // 읽지 않은 경우 자동으로 읽음 처리
    if (!inquiry.is_read) {
      await handleToggleRead(inquiry.id, false);
    }
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    fetchInquiries();
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
          <button onClick={fetchInquiries}>다시 시도</button>
        </div>
      </div>
    );
  }

  const unreadCount = inquiries.filter((i) => !i.is_read).length;

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Inquiries</h1>
          <p className={styles.subtitle}>
            총 {inquiries.length}개의 문의
            {unreadCount > 0 && (
              <span className={styles.unreadBadge}>{unreadCount}개 읽지 않음</span>
            )}
          </p>
        </div>
      </header>

      <div className={styles.content}>
        {/* Inquiry List */}
        <div className={styles.listSection}>
          {inquiries.length === 0 ? (
            <div className={styles.empty}>
              <p>등록된 문의가 없습니다.</p>
            </div>
          ) : (
            <div className={styles.list}>
              {inquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className={`${styles.item} ${!inquiry.is_read ? styles.unread : ''} ${selectedInquiry?.id === inquiry.id ? styles.selected : ''}`}
                  onClick={() => handleSelect(inquiry)}
                >
                  <div className={styles.itemHeader}>
                    <span className={styles.itemName}>{inquiry.name}</span>
                    <span className={styles.itemDate}>{formatDate(inquiry.created_at)}</span>
                  </div>
                  <p className={styles.itemEmail}>{inquiry.email}</p>
                  <p className={styles.itemPreview}>{inquiry.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <div className={styles.detailSection}>
          {selectedInquiry ? (
            <div className={styles.detail}>
              <div className={styles.detailHeader}>
                <div>
                  <h2 className={styles.detailName}>{selectedInquiry.name}</h2>
                  <p className={styles.detailEmail}>{selectedInquiry.email}</p>
                  {selectedInquiry.phone && (
                    <p className={styles.detailPhone}>{selectedInquiry.phone}</p>
                  )}
                </div>
                <span className={styles.detailDate}>
                  {formatDate(selectedInquiry.created_at)}
                </span>
              </div>

              <div className={styles.detailContent}>
                <p>{selectedInquiry.content}</p>
              </div>

              <div className={styles.detailActions}>
                <button
                  className={styles.toggleButton}
                  onClick={() => handleToggleRead(selectedInquiry.id, selectedInquiry.is_read)}
                >
                  {selectedInquiry.is_read ? '읽지 않음으로 표시' : '읽음으로 표시'}
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(selectedInquiry.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.noSelection}>
              <p>문의를 선택해주세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
