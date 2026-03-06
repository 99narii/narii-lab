// ===========================================
// Supabase Client
// 클라이언트 사이드 Supabase 인스턴스
// ===========================================

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Note: Using untyped client for flexibility
// Type safety is handled at the application level with explicit types
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
