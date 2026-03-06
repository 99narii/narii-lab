// ===========================================
// Supabase Database Types
// 데이터베이스 타입 정의
// ===========================================

export interface Database {
  public: {
    Tables: {
      portfolios: {
        Row: Portfolio;
        Insert: PortfolioInsert;
        Update: PortfolioUpdate;
      };
      tech_stacks: {
        Row: TechStack;
        Insert: TechStackInsert;
        Update: TechStackUpdate;
      };
      inquiries: {
        Row: Inquiry;
        Insert: InquiryInsert;
        Update: InquiryUpdate;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// -----------------------------
// Portfolio Types
// -----------------------------
export interface Portfolio {
  id: string;
  title: string;
  client: string | null;
  category: string;
  description: string | null;
  thumbnail_url: string | null;
  year: number | null;
  tech_stack_ids: string[] | null;
  link: string | null;
  github_link: string | null;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioInsert {
  id?: string;
  title: string;
  client?: string | null;
  category: string;
  description?: string | null;
  thumbnail_url?: string | null;
  year?: number | null;
  tech_stack_ids?: string[] | null;
  link?: string | null;
  github_link?: string | null;
  published?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface PortfolioUpdate {
  id?: string;
  title?: string;
  client?: string | null;
  category?: string;
  description?: string | null;
  thumbnail_url?: string | null;
  year?: number | null;
  tech_stack_ids?: string[] | null;
  link?: string | null;
  github_link?: string | null;
  published?: boolean;
  display_order?: number;
  updated_at?: string;
}

// -----------------------------
// TechStack Types
// -----------------------------
export interface TechStack {
  id: string;
  name: string;
  icon_url: string | null;
  created_at: string;
}

export interface TechStackInsert {
  id?: string;
  name: string;
  icon_url?: string | null;
  created_at?: string;
}

export interface TechStackUpdate {
  id?: string;
  name?: string;
  icon_url?: string | null;
}

// -----------------------------
// Inquiry Types
// -----------------------------
export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface InquiryInsert {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  content: string;
  is_read?: boolean;
  created_at?: string;
}

export interface InquiryUpdate {
  id?: string;
  name?: string;
  email?: string;
  phone?: string | null;
  content?: string;
  is_read?: boolean;
}

// -----------------------------
// Category Options
// -----------------------------
export const PORTFOLIO_CATEGORIES = [
  { value: 'branding', label: 'Branding' },
  { value: 'web', label: 'Web Design' },
  { value: 'app', label: 'App Design' },
  { value: 'graphic', label: 'Graphic Design' },
  { value: 'other', label: 'Other' },
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number]['value'];
