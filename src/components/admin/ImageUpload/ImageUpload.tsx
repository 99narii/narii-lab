'use client';

// ===========================================
// ImageUpload Component
// 이미지 업로드 컴포넌트 (WebP 변환 + 리사이징)
// ===========================================

import { useState, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './ImageUpload.module.scss';

// -----------------------------
// Types
// -----------------------------
interface ImageUploadProps {
  /** 현재 이미지 URL */
  value?: string | null;
  /** 이미지 변경 핸들러 */
  onChange: (url: string | null) => void;
  /** 버킷 이름 */
  bucket?: string;
  /** 폴더 경로 */
  folder?: string;
  /** 라벨 */
  label?: string;
  /** 최대 너비 (리사이징) */
  maxWidth?: number;
  /** 최대 높이 (리사이징) */
  maxHeight?: number;
  /** 이미지 품질 (0-1) */
  quality?: number;
}

// -----------------------------
// Image Optimization Utils
// -----------------------------

/**
 * 이미지를 WebP로 변환하고 리사이징
 */
const optimizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality: number
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      // 원본 비율 유지하면서 리사이징
      let { width, height } = img;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      // 이미지 그리기
      ctx.drawImage(img, 0, 0, width, height);

      // WebP로 변환
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert image'));
          }
        },
        'image/webp',
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

// -----------------------------
// Component
// -----------------------------
export const ImageUpload = ({
  value,
  onChange,
  bucket = 'portfolio',
  folder = 'thumbnails',
  label = '이미지 업로드',
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.85,
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 파일 업로드 처리
  const handleUpload = useCallback(
    async (file: File) => {
      try {
        setUploading(true);
        setError(null);

        // 파일 타입 확인
        if (!file.type.startsWith('image/')) {
          throw new Error('이미지 파일만 업로드 가능합니다.');
        }

        // 파일 크기 확인 (10MB 제한 - 최적화 전)
        if (file.size > 10 * 1024 * 1024) {
          throw new Error('파일 크기는 10MB 이하여야 합니다.');
        }

        // 이미지 최적화 (WebP 변환 + 리사이징)
        const optimizedBlob = await optimizeImage(file, maxWidth, maxHeight, quality);

        // 파일명 생성 (항상 .webp)
        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;

        // Supabase Storage에 업로드
        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(fileName, optimizedBlob, {
            contentType: 'image/webp',
          });

        if (uploadError) throw uploadError;

        // Public URL 가져오기
        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(fileName);

        onChange(publicUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : '업로드에 실패했습니다.');
      } finally {
        setUploading(false);
      }
    },
    [bucket, folder, maxWidth, maxHeight, quality, onChange]
  );

  // 파일 선택 처리
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  // 드래그 앤 드롭 처리
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // 이미지 제거
  const handleRemove = () => {
    onChange(null);
  };

  return (
    <div className={styles.upload}>
      <label className={styles.label}>{label}</label>

      {value ? (
        // 이미지 미리보기
        <div className={styles.preview}>
          <img src={value} alt="Preview" />
          <button
            type="button"
            className={styles.removeButton}
            onClick={handleRemove}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ) : (
        // 업로드 영역
        <div
          className={`${styles.dropzone} ${uploading ? styles.uploading : ''}`}
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.input}
          />

          {uploading ? (
            <div className={styles.spinner} />
          ) : (
            <>
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17,8 12,3 7,8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p className={styles.text}>클릭하거나 이미지를 드래그하세요</p>
              <p className={styles.hint}>자동으로 WebP 변환 및 최적화됩니다</p>
            </>
          )}
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
