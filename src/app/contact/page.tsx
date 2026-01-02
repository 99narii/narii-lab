'use client';

// ===========================================
// Contact Page
// 연락하기 페이지
// ===========================================

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Header, Footer, SectionTitle, Button } from '@/components/common';
import { useLanguage } from '@/contexts';
import { contactData } from '@/data/contact';
import styles from './page.module.scss';

// -----------------------------
// Form Schema (동적 언어 메시지)
// -----------------------------
const createContactSchema = (language: 'ko' | 'en') => z.object({
  name: z.string().min(2, contactData.form.name.error[language]),
  email: z.string().email(contactData.form.email.error[language]),
  phone: z.string().optional(),
  message: z.string().min(10, contactData.form.message.error[language]),
});

type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;

// -----------------------------
// Component
// -----------------------------
export default function ContactPage() {
  const { t, language } = useLanguage();
  const { hero, info, form } = contactData;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(createContactSchema(language)),
  });

  const onSubmit = async (data: ContactFormData) => {
    // TODO: API 연동
    console.log('Form submitted:', data);
    alert(t(form.success));
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
                    {...register('phone')}
                    className={styles.input}
                    placeholder={form.phone.placeholder}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="message" className={styles.label}>
                    {t(form.message.label)}
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    className={styles.textarea}
                    rows={6}
                    placeholder={t(form.message.placeholder)}
                  />
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
    </>
  );
}
