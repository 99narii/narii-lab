'use client';

// ===========================================
// Estimate Page - 전면 개편
// 간편견적 페이지 (7:3 레이아웃)
// ===========================================

import { useState, useMemo } from 'react';
import { Header, Footer, SectionTitle, Button } from '@/components/common';
import { useLanguage } from '@/contexts';
import {
  estimateData,
  EstimateOption,
  EstimateSelectOption,
  calculateEstimate,
  formatPrice,
} from '@/data/estimate';
import styles from './page.module.scss';

// -----------------------------
// Selection State Type
// -----------------------------
interface Selections {
  field: string;
  scope: string;
  platform: string;
  type: string;
  budget: string;
  duration: string;
}

// -----------------------------
// Option Button Component
// -----------------------------
interface OptionButtonProps {
  option: EstimateOption;
  isSelected: boolean;
  onClick: () => void;
  t: (text: { ko: string; en: string }) => string;
}

const OptionButton = ({ option, isSelected, onClick, t }: OptionButtonProps) => (
  <button
    type="button"
    className={`${styles.optionButton} ${isSelected ? styles.selected : ''}`}
    onClick={onClick}
  >
    {t(option.label)}
  </button>
);

// -----------------------------
// Option Group Component
// -----------------------------
interface OptionGroupProps {
  label: { ko: string; en: string };
  options: EstimateOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  t: (text: { ko: string; en: string }) => string;
}

const OptionGroup = ({ label, options, selectedId, onSelect, t }: OptionGroupProps) => (
  <div className={styles.optionGroup}>
    <h3 className={styles.optionLabel}>{t(label)}</h3>
    <div className={styles.optionButtons}>
      {options.map((option) => (
        <OptionButton
          key={option.id}
          option={option}
          isSelected={selectedId === option.id}
          onClick={() => onSelect(option.id)}
          t={t}
        />
      ))}
    </div>
  </div>
);

// -----------------------------
// Select Group Component
// -----------------------------
interface SelectGroupProps {
  label: { ko: string; en: string };
  options: EstimateSelectOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  t: (text: { ko: string; en: string }) => string;
  placeholder: { ko: string; en: string };
}

const SelectGroup = ({ label, options, selectedValue, onSelect, t, placeholder }: SelectGroupProps) => (
  <div className={styles.optionGroup}>
    <h3 className={styles.optionLabel}>{t(label)}</h3>
    <select
      className={`${styles.select} ${selectedValue ? styles.selected : ''}`}
      value={selectedValue}
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="">{t(placeholder)}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {t(option.label)}
        </option>
      ))}
    </select>
  </div>
);

// -----------------------------
// Dynamic Text Component (우측 패널용)
// -----------------------------
interface DynamicTextProps {
  selections: Selections;
  t: (text: { ko: string; en: string }) => string;
  language: 'ko' | 'en';
}

const DynamicText = ({ selections, t, language }: DynamicTextProps) => {
  const { options, dynamicText } = estimateData;

  // 선택된 값의 라벨 가져오기
  const getLabel = (
    key: keyof typeof options,
    selectedId: string
  ): { ko: string; en: string } | null => {
    const optionData = options[key];
    if ('items' in optionData) {
      const items = optionData.items as (EstimateOption | EstimateSelectOption)[];
      const found = items.find((item) => {
        if ('id' in item) return item.id === selectedId;
        if ('value' in item) return item.value === selectedId;
        return false;
      });
      if (found) return found.label;
    }
    return null;
  };

  // 각 항목의 라벨 또는 플레이스홀더
  const fieldLabel = getLabel('field', selections.field);
  const platformLabel = getLabel('platform', selections.platform);
  const typeLabel = getLabel('type', selections.type);
  const budgetLabel = getLabel('budget', selections.budget);
  const durationLabel = getLabel('duration', selections.duration);

  if (language === 'ko') {
    return (
      <div className={styles.dynamicText}>
        <span className={fieldLabel ? styles.filled : styles.placeholder}>
          {fieldLabel ? t(fieldLabel) : t(dynamicText.placeholders.field)}
        </span>
        <br />
        <span className={platformLabel ? styles.filled : styles.placeholder}>
          {platformLabel ? t(platformLabel) : t(dynamicText.placeholders.platform)}
        </span>
        <span className={styles.connector}>의</span>
        <br />
        <span className={typeLabel ? styles.filled : styles.placeholder}>
          {typeLabel ? t(typeLabel) : t(dynamicText.placeholders.type)}
        </span>
        <span className={styles.connector}> 프로젝트를</span>
        <br />
        <span className={styles.connector}>의뢰하고 싶어요.</span>
        <br />
        <br />
        <span className={budgetLabel ? styles.filled : styles.placeholder}>
          {budgetLabel ? t(budgetLabel) : t(dynamicText.placeholders.budget)}
        </span>
        <span className={styles.connector}>의 규모로</span>
        <br />
        <span className={durationLabel ? styles.filled : styles.placeholder}>
          {durationLabel ? t(durationLabel) : t(dynamicText.placeholders.duration)}
        </span>
        <span className={styles.connector}> 동안 진행할</span>
        <br />
        <span className={styles.connector}>예정입니다.</span>
      </div>
    );
  }

  // English version
  return (
    <div className={styles.dynamicText}>
      <span className={styles.connector}>I want to request</span>
      <br />
      <span className={styles.connector}>a </span>
      <span className={typeLabel ? styles.filled : styles.placeholder}>
        {typeLabel ? t(typeLabel) : t(dynamicText.placeholders.type)}
      </span>
      <span className={styles.connector}> project</span>
      <br />
      <span className={styles.connector}>for </span>
      <span className={fieldLabel ? styles.filled : styles.placeholder}>
        {fieldLabel ? t(fieldLabel) : t(dynamicText.placeholders.field)}
      </span>
      <br />
      <span className={platformLabel ? styles.filled : styles.placeholder}>
        {platformLabel ? t(platformLabel) : t(dynamicText.placeholders.platform)}
      </span>
      <span className={styles.connector}>.</span>
      <br />
      <br />
      <span className={styles.connector}>With a budget of </span>
      <span className={budgetLabel ? styles.filled : styles.placeholder}>
        {budgetLabel ? t(budgetLabel) : t(dynamicText.placeholders.budget)}
      </span>
      <span className={styles.connector}>,</span>
      <br />
      <span className={styles.connector}>planning to proceed</span>
      <br />
      <span className={styles.connector}>for </span>
      <span className={durationLabel ? styles.filled : styles.placeholder}>
        {durationLabel ? t(durationLabel) : t(dynamicText.placeholders.duration)}
      </span>
      <span className={styles.connector}>.</span>
    </div>
  );
};

// -----------------------------
// Component
// -----------------------------
export default function EstimatePage() {
  const { t, language } = useLanguage();
  const { hero, options, buttons, result } = estimateData;

  // 선택 상태
  const [selections, setSelections] = useState<Selections>({
    field: '',
    scope: '',
    platform: '',
    type: '',
    budget: '',
    duration: '',
  });

  // 견적 확인 여부
  const [isChecked, setIsChecked] = useState(false);

  // 모든 필수 항목 선택 여부
  const isComplete = useMemo(() => {
    return (
      selections.field !== '' &&
      selections.scope !== '' &&
      selections.platform !== '' &&
      selections.type !== '' &&
      selections.budget !== '' &&
      selections.duration !== ''
    );
  }, [selections]);

  // 견적 계산
  const estimate = useMemo(() => {
    return calculateEstimate(selections);
  }, [selections]);

  // 선택 핸들러
  const handleSelect = (key: keyof Selections, value: string) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
    setIsChecked(false);
  };

  // 견적 확인 핸들러
  const handleCheck = () => {
    if (isComplete) {
      setIsChecked(true);
    }
  };

  // 리셋 핸들러
  const handleReset = () => {
    setSelections({
      field: '',
      scope: '',
      platform: '',
      type: '',
      budget: '',
      duration: '',
    });
    setIsChecked(false);
  };

  // 문의하기 핸들러
  const handleContact = () => {
    window.location.href = '/contact';
  };

  return (
    <>
      <Header />

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

        {/* 견적 섹션 - 7:3 레이아웃 */}
        <section className={styles.section}>
          <div className={styles.estimateContainer}>
            {/* 좌측: 옵션 선택 (70%) */}
            <div className={styles.optionsPanel}>
              <div className={styles.optionsGrid}>
                {/* 분야 */}
                <OptionGroup
                  label={options.field.label}
                  options={options.field.items}
                  selectedId={selections.field}
                  onSelect={(id) => handleSelect('field', id)}
                  t={t}
                />

                {/* 프로젝트 범위 */}
                <OptionGroup
                  label={options.scope.label}
                  options={options.scope.items}
                  selectedId={selections.scope}
                  onSelect={(id) => handleSelect('scope', id)}
                  t={t}
                />

                {/* 프로젝트 형태 */}
                <OptionGroup
                  label={options.platform.label}
                  options={options.platform.items}
                  selectedId={selections.platform}
                  onSelect={(id) => handleSelect('platform', id)}
                  t={t}
                />

                {/* 프로젝트 성격 */}
                <OptionGroup
                  label={options.type.label}
                  options={options.type.items}
                  selectedId={selections.type}
                  onSelect={(id) => handleSelect('type', id)}
                  t={t}
                />

                {/* 예산 범위 */}
                <OptionGroup
                  label={options.budget.label}
                  options={options.budget.items}
                  selectedId={selections.budget}
                  onSelect={(id) => handleSelect('budget', id)}
                  t={t}
                />

                {/* 프로젝트 기간 (셀렉트) */}
                <SelectGroup
                  label={options.duration.label}
                  options={options.duration.items}
                  selectedValue={selections.duration}
                  onSelect={(value) => handleSelect('duration', value)}
                  t={t}
                  placeholder={{ ko: '기간 선택', en: 'Select duration' }}
                />
              </div>
            </div>

            {/* 우측: 동적 텍스트 + 견적 결과 (30%) */}
            <div className={styles.summaryPanel}>
              <div className={styles.summaryCard}>
                {/* 동적 텍스트 */}
                <div className={styles.dynamicTextWrapper}>
                  <DynamicText selections={selections} t={t} language={language} />
                </div>

                {/* 예상 견적 */}
                <div className={styles.estimateResult}>
                  <h3 className={styles.resultTitle}>{t(result.title)}</h3>
                  {estimate ? (
                    <div className={styles.priceBox}>
                      <span className={styles.priceValue}>
                        {formatPrice(estimate.min, language)} ~ {formatPrice(estimate.max, language)}
                      </span>
                    </div>
                  ) : (
                    <p className={styles.resultPlaceholder}>{t(result.calculating)}</p>
                  )}
                  <p className={styles.disclaimer}>{t(result.disclaimer)}</p>
                </div>

                {/* 버튼 */}
                <div className={styles.buttonGroup}>
                  {!isChecked ? (
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleCheck}
                      disabled={!isComplete}
                    >
                      {t(buttons.check)}
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        onClick={handleContact}
                      >
                        {t(buttons.contact)}
                      </Button>
                      <Button
                        variant="ghost"
                        size="md"
                        fullWidth
                        onClick={handleReset}
                      >
                        {t(buttons.reset)}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
