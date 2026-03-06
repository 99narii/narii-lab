-- ===========================================
-- Supabase Schema for narii-lab
-- ===========================================

-- -----------------------------
-- Tech Stacks Table (기술스택)
-- -----------------------------
CREATE TABLE IF NOT EXISTS tech_stacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  icon_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------
-- Portfolios Table (포트폴리오)
-- -----------------------------
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(100) NOT NULL DEFAULT 'web',  -- 유형
  title VARCHAR(255) NOT NULL,                    -- 프로젝트명
  description TEXT,                               -- 프로젝트 설명
  client VARCHAR(255),                            -- 클라이언트
  year INTEGER,                                   -- 연도
  tech_stack_ids UUID[],                          -- 기술스택 (tech_stacks.id 배열)
  link TEXT,                                      -- 방문링크
  thumbnail_url TEXT,                             -- 이미지
  published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------
-- Inquiries Table (문의하기)
-- -----------------------------
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,    -- 이름/회사명
  email VARCHAR(255) NOT NULL,   -- 이메일
  phone VARCHAR(50),             -- 연락처
  content TEXT NOT NULL,         -- 문의내용
  is_read BOOLEAN DEFAULT false, -- 읽음 여부
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------
-- Indexes
-- -----------------------------
CREATE INDEX IF NOT EXISTS idx_portfolios_published ON portfolios(published);
CREATE INDEX IF NOT EXISTS idx_portfolios_category ON portfolios(category);
CREATE INDEX IF NOT EXISTS idx_portfolios_display_order ON portfolios(display_order);
CREATE INDEX IF NOT EXISTS idx_inquiries_is_read ON inquiries(is_read);

-- -----------------------------
-- updated_at 자동 갱신 함수
-- -----------------------------
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER portfolios_updated_at
  BEFORE UPDATE ON portfolios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- -----------------------------
-- RLS 설정
-- -----------------------------
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- portfolios
CREATE POLICY "Public can read published portfolios"
  ON portfolios FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can do everything on portfolios"
  ON portfolios FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- tech_stacks
CREATE POLICY "Public can read tech_stacks"
  ON tech_stacks FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can do everything on tech_stacks"
  ON tech_stacks FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- inquiries
CREATE POLICY "Anyone can insert inquiry"
  ON inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read and update inquiries"
  ON inquiries FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update inquiries"
  ON inquiries FOR UPDATE
  USING (auth.role() = 'authenticated');