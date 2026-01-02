// ===========================================
// Common Types
// ===========================================

// -----------------------------
// Bilingual Text
// -----------------------------
export interface BilingualText {
  ko: string;
  en: string;
}

// -----------------------------
// Navigation
// -----------------------------
export interface NavItem {
  id: string;
  label: BilingualText;
  href: string;
  ariaLabel: string;
  isExternal?: boolean;
}

// -----------------------------
// Portfolio
// -----------------------------
export type PortfolioCategory = 'all' | 'web' | 'app' | 'branding' | 'uiux';

export interface PortfolioCategoryItem {
  id: PortfolioCategory;
  label: BilingualText;
}

export interface PortfolioItem {
  id: string;
  title: BilingualText;
  client: string;
  category: Exclude<PortfolioCategory, 'all'>;
  thumbnail: string;
  thumbnailAlt: string;
  description: BilingualText;
  tags: string[];
  year: number;
  link?: string;
  isFeatured?: boolean;
}

// -----------------------------
// Service
// -----------------------------
export interface ServiceItem {
  id: string;
  text: string;
  delay: number;
}

// -----------------------------
// Persuasion
// -----------------------------
export interface PersuasionItem {
  id: string;
  title: BilingualText;
  description: BilingualText;
  icon: string;
}

// -----------------------------
// Button
// -----------------------------
export interface CTAButton {
  text: BilingualText;
  href: string;
  ariaLabel: string;
}

// -----------------------------
// Contact Form
// -----------------------------
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// -----------------------------
// Estimate Form
// -----------------------------
export interface EstimateFormData {
  projectType: string[];
  budget: string;
  timeline: string;
  description: string;
  name: string;
  email: string;
  phone?: string;
}

// -----------------------------
// SEO
// -----------------------------
export interface PageSEO {
  title: string;
  description: string;
  keywords?: string[];
}
