'use client';

// ===========================================
// Admin Tech Stacks Page
// 기술스택 관리 페이지 (CRUD)
// ===========================================

import { useState, useEffect } from 'react';
import { supabase, type TechStack } from '@/lib/supabase';
import styles from './page.module.scss';

export default function AdminTechStacksPage() {
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 새 기술스택 폼 상태
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);

  // 수정 상태
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  // 기술스택 목록 가져오기
  const fetchTechStacks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tech_stacks')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setTechStacks(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 새 기술스택 추가
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newName.trim()) {
      alert('기술스택 이름을 입력해주세요.');
      return;
    }

    try {
      setAdding(true);
      const { data, error } = await supabase
        .from('tech_stacks')
        .insert([{ name: newName.trim() }])
        .select()
        .single();

      if (error) throw error;

      setTechStacks((prev) => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
      setNewName('');
    } catch (err) {
      alert(err instanceof Error ? err.message : '추가에 실패했습니다.');
    } finally {
      setAdding(false);
    }
  };

  // 수정 시작
  const handleEditStart = (item: TechStack) => {
    setEditingId(item.id);
    setEditName(item.name);
  };

  // 수정 취소
  const handleEditCancel = () => {
    setEditingId(null);
    setEditName('');
  };

  // 수정 저장
  const handleEditSave = async (id: string) => {
    if (!editName.trim()) {
      alert('기술스택 이름을 입력해주세요.');
      return;
    }

    try {
      const { error } = await supabase
        .from('tech_stacks')
        .update({ name: editName.trim() })
        .eq('id', id);

      if (error) throw error;

      setTechStacks((prev) =>
        prev
          .map((item) =>
            item.id === id ? { ...item, name: editName.trim() } : item
          )
          .sort((a, b) => a.name.localeCompare(b.name))
      );
      handleEditCancel();
    } catch (err) {
      alert(err instanceof Error ? err.message : '수정에 실패했습니다.');
    }
  };

  // 삭제
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" 기술스택을 삭제하시겠습니까?`)) return;

    try {
      const { error } = await supabase.from('tech_stacks').delete().eq('id', id);
      if (error) throw error;
      setTechStacks((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : '삭제에 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchTechStacks();
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
          <button onClick={fetchTechStacks}>다시 시도</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Tech Stacks</h1>
        <p className={styles.subtitle}>총 {techStacks.length}개의 기술스택</p>
      </header>

      {/* Add Form */}
      <form className={styles.addForm} onSubmit={handleAdd}>
        <div className={styles.addFormRow}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={styles.input}
            placeholder="예: React, Next.js, TypeScript"
          />
          <button type="submit" className={styles.addButton} disabled={adding}>
            {adding ? '추가 중...' : '추가'}
          </button>
        </div>
      </form>

      {/* List */}
      {techStacks.length === 0 ? (
        <div className={styles.empty}>
          <p>등록된 기술스택이 없습니다.</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {techStacks.map((item) => (
            <li key={item.id} className={styles.item}>
              {editingId === item.id ? (
                // 수정 모드
                <div className={styles.editMode}>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className={styles.editInput}
                    autoFocus
                  />
                  <div className={styles.editActions}>
                    <button
                      type="button"
                      className={styles.saveButton}
                      onClick={() => handleEditSave(item.id)}
                    >
                      저장
                    </button>
                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={handleEditCancel}
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                // 보기 모드
                <>
                  <span className={styles.itemName}>{item.name}</span>
                  <div className={styles.itemActions}>
                    <button
                      type="button"
                      className={styles.editButton}
                      onClick={() => handleEditStart(item)}
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      className={styles.deleteButton}
                      onClick={() => handleDelete(item.id, item.name)}
                    >
                      삭제
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
