'use client';

// ===========================================
// Contact Page
// 연락하기 페이지
// ===========================================

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Header, Footer, SectionTitle, Button, Alert } from '@/components/common';
import { useLanguage } from '@/contexts';
import { contactData } from '@/data/contact';
import { supabase } from '@/lib/supabase';
import styles from './page.module.scss';

// -----------------------------
// 전화번호 포맷팅 함수
// -----------------------------
const formatPhoneNumber = (value: string): string => {
  // 숫자만 추출
  const numbers = value.replace(/\D/g, '');

  // 최대 11자리로 제한
  const limited = numbers.slice(0, 11);

  // 길이에 따라 포맷팅
  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 5) {
    // 9자리용: 2-3-4
    return `${limited.slice(0, 2)}-${limited.slice(2)}`;
  } else if (limited.length <= 9) {
    // 9자리: 2-3-4
    return `${limited.slice(0, 2)}-${limited.slice(2, 5)}-${limited.slice(5)}`;
  } else if (limited.length === 10) {
    // 10자리: 2-4-4
    return `${limited.slice(0, 2)}-${limited.slice(2, 6)}-${limited.slice(6)}`;
  } else {
    // 11자리: 3-4-4
    return `${limited.slice(0, 3)}-${limited.slice(3, 7)}-${limited.slice(7)}`;
  }
};

// -----------------------------
// Form Schema (동적 언어 메시지)
// -----------------------------
const createContactSchema = (language: 'ko' | 'en') => z.object({
  name: z.string()
    .min(1, contactData.form.name.error[language])
    .max(20, contactData.form.name.error[language]),
  email: z.string().email(contactData.form.email.error[language]),
  phone: z.string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === '') return true;
      const numbers = val.replace(/\D/g, '');
      return numbers.length >= 9 && numbers.length <= 11 && numbers.startsWith('0');
    }, contactData.form.phone.error[language]),
  message: z.string()
    .min(10, contactData.form.message.error[language])
    .max(400, language === 'ko' ? '문의 내용은 400자 이내로 입력해주세요' : 'Message must be 400 characters or less'),
});

type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;

// -----------------------------
// Component
// -----------------------------
export default function ContactPage() {
  const { t, language } = useLanguage();
  const { hero, info, form } = contactData;
  const [messageLength, setMessageLength] = useState(0);
  const [phoneValue, setPhoneValue] = useState('');
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    message: string;
  }>({ isOpen: false, type: 'success', message: '' });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(createContactSchema(language)),
  });

  // 전화번호 입력 핸들러
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneValue(formatted);
    setValue('phone', formatted);
  };

  // 메시지 입력 핸들러
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, 400);
    setMessageLength(value.length);
    setValue('message', value);
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      const { error } = await supabase.from('inquiries').insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          content: data.message,
          is_read: false,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setAlertState({
        isOpen: true,
        type: 'success',
        message: t(form.success),
      });
    } catch (err) {
      setAlertState({
        isOpen: true,
        type: 'error',
        message:
          language === 'ko'
            ? '문의 등록에 실패했습니다. 다시 시도해주세요.'
            : 'Failed to submit inquiry. Please try again.',
      });
      console.error('Inquiry submission error:', err);
    }
  };

  // 알럿 닫기 핸들러
  const handleAlertClose = () => {
    setAlertState({ ...alertState, isOpen: false });
    if (alertState.type === 'success') {
      window.location.reload();
    }
  };

  return (
    <>
      {/* 헤더 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <main id="main-content" className={styles.main}>
        {/* Hero 섹션 */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <SectionTitle
              title={t(hero.title)}
              subtitle={t(hero.subtitle)}
              align="center"
            />
          </div>
        </section>

        {/* 연락처 섹션 */}
        <section className={styles.section}>
          <div className={styles.containerNarrow}>
            <div className={styles.grid}>
              {/* 연락처 정보 */}
              <div className={styles.contactInfo}>
                <h2 className={styles.infoTitle}>{t(info.title)}</h2>

                <div className={styles.infoItem}>
                  <h3 className={styles.infoLabel}>{info.email.label}</h3>
                  <a
                    href={`mailto:${info.email.value}`}
                    className={styles.infoValue}
                    aria-label={language === 'ko' ? '이메일로 연락하기' : 'Contact via email'}
                  >
                    {info.email.value}
                  </a>
                </div>

                <div className={styles.infoItem}>
                  <h3 className={styles.infoLabel}>{info.response.label}</h3>
                  <p className={styles.infoValue}>
                    {t(info.response.value)}
                  </p>
                </div>

                <div className={styles.infoItem}>
                  <h3 className={styles.infoLabel}>{info.hours.label}</h3>
                  <p className={styles.infoValue}>
                    {t(info.hours.value)}
                  </p>
                </div>
              </div>

              {/* 문의 폼 */}
              <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>
                    {t(form.name.label)}
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className={styles.input}
                    placeholder={t(form.name.placeholder)}
                    maxLength={20}
                  />
                  {errors.name && (
                    <p className={styles.error}>{errors.name.message}</p>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>
                    {t(form.email.label)}
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={styles.input}
                    placeholder={form.email.placeholder}
                  />
                  {errors.email && (
                    <p className={styles.error}>{errors.email.message}</p>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="phone" className={styles.label}>
                    {t(form.phone.label)}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phoneValue}
                    onChange={handlePhoneChange}
                    className={styles.input}
                    placeholder={form.phone.placeholder}
                  />
                  {errors.phone && (
                    <p className={styles.error}>{errors.phone.message}</p>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="message" className={styles.label}>
                    {t(form.message.label)}
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    onChange={handleMessageChange}
                    className={styles.textarea}
                    rows={6}
                    placeholder={t(form.message.placeholder)}
                    maxLength={400}
                  />
                  <div className={styles.charCount}>
                    <span>{messageLength}/400</span>
                  </div>
                  {errors.message && (
                    <p className={styles.error}>{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t(form.submit.submitting) : t(form.submit.default)}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <Footer />

      {/* 커스텀 알럿 */}
      <Alert
        isOpen={alertState.isOpen}
        type={alertState.type}
        title={alertState.type === 'success' ? (language === 'ko' ? '전송 완료' : 'Sent Successfully') : (language === 'ko' ? '오류' : 'Error')}
        message={alertState.message}
        confirmText={language === 'ko' ? '확인' : 'OK'}
        onClose={handleAlertClose}
      />
    </>
  );
}
