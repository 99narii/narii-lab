'use client';

// ===========================================
// Edit Portfolio Page
// 포트폴리오 수정 페이지
// ===========================================

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase, type Portfolio, type PortfolioUpdate } from '@/lib/supabase';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { TechStackSelect } from '@/components/admin/TechStackSelect';
import styles from '../form.module.scss';

export default function EditPortfolioPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Portfolio | null>(null);

  // 포트폴리오 데이터 가져오기
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolios')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setFormData(data);
      } catch (err) {
        alert(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
        router.push('/admin/portfolios');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id, router]);

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData?.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    try {
      setSaving(true);

      const updateData: PortfolioUpdate = {
        title: formData.title,
        client: formData.client,
        category: formData.category,
        description: formData.description,
        thumbnail_url: formData.thumbnail_url,
        tech_stack_ids: formData.tech_stack_ids,
        year: formData.year,
        link: formData.link,
        github_link: formData.github_link,
        published: formData.published,
        display_order: formData.display_order,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('portfolios')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      alert('포트폴리오가 수정되었습니다.');
      router.push('/admin/portfolios');
    } catch (err) {
      alert(err instanceof Error ? err.message : '저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  // 입력 변경 처리
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
          }
        : null
    );
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>로딩 중...</div>
      </div>
    );
  }

  if (!formData) {
    return null;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>포트폴리오 수정</h1>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* 썸네일 */}
        <ImageUpload
          label="썸네일 이미지"
          value={formData.thumbnail_url}
          onChange={(url) => setFormData((prev) => prev ? { ...prev, thumbnail_url: url } : null)}
        />

        {/* 제목 */}
        <div className={styles.field}>
          <label htmlFor="title" className={styles.label}>
            제목 <span className={styles.required}>*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
            placeholder="프로젝트 제목"
            required
          />
        </div>

        {/* 클라이언트 */}
        <div className={styles.field}>
          <label htmlFor="client" className={styles.label}>
            클라이언트
          </label>
          <input
            id="client"
            name="client"
            type="text"
            value={formData.client || ''}
            onChange={handleChange}
            className={styles.input}
            placeholder="클라이언트 이름"
          />
        </div>

        {/* 카테고리 */}
        <div className={styles.field}>
          <label htmlFor="category" className={styles.label}>
            카테고리
          </label>
          <input
            id="category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            className={styles.input}
            placeholder="예: 웹사이트, 앱, 브랜딩"
          />
        </div>

        {/* 기술스택 */}
        <TechStackSelect
          value={formData.tech_stack_ids || []}
          onChange={(ids) => setFormData((prev) => prev ? { ...prev, tech_stack_ids: ids } : null)}
        />

        {/* 연도 */}
        <div className={styles.field}>
          <label htmlFor="year" className={styles.label}>
            연도
          </label>
          <input
            id="year"
            name="year"
            type="number"
            value={formData.year || new Date().getFullYear()}
            onChange={handleChange}
            className={styles.input}
            min={2000}
            max={2100}
          />
        </div>

        {/* 설명 */}
        <div className={styles.field}>
          <label htmlFor="description" className={styles.label}>
            설명
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="프로젝트 설명"
            rows={4}
          />
        </div>

        {/* 링크 */}
        <div className={styles.field}>
          <label htmlFor="link" className={styles.label}>
            외부 링크
          </label>
          <input
            id="link"
            name="link"
            type="url"
            value={formData.link || ''}
            onChange={handleChange}
            className={styles.input}
            placeholder="https://example.com"
          />
        </div>

        {/* GitHub/자료 링크 */}
        <div className={styles.field}>
          <label htmlFor="github_link" className={styles.label}>
            GitHub / 자료 링크
          </label>
          <input
            id="github_link"
            name="github_link"
            type="url"
            value={formData.github_link || ''}
            onChange={handleChange}
            className={styles.input}
            placeholder="https://github.com/..."
          />
        </div>

        {/* 정렬 순서 */}
        <div className={styles.field}>
          <label htmlFor="display_order" className={styles.label}>
            정렬 순서
          </label>
          <input
            id="display_order"
            name="display_order"
            type="number"
            value={formData.display_order}
            onChange={handleChange}
            className={styles.input}
            min={0}
          />
        </div>

        {/* 발행 여부 */}
        <div className={styles.checkbox}>
          <input
            id="published"
            name="published"
            type="checkbox"
            checked={formData.published}
            onChange={handleChange}
          />
          <label htmlFor="published">발행하기</label>
        </div>

        {/* 버튼 */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => router.back()}
          >
            취소
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={saving}
          >
            {saving ? '저장 중...' : '저장'}
          </button>
        </div>
      </form>
    </div>
  );
}
