-- Vibe Makers Academy — Railway Postgres schema
-- Migrated from Lovable-owned Supabase (rtvlqgieeckkxdwjbnrh) on 2026-05-02.
--
-- Tables here:
--   blog_posts          — public blog
--   parent_interest     — /parents form submissions
--   school_enquiries    — /schools form submissions
--   hackathon_waitlist  — /hackathon form submissions
--
-- Auth (admin login, user_roles) intentionally NOT migrated yet — admin
-- continues to use Supabase auth for the /admin route only.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =============================================================================
-- blog_posts
-- =============================================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title            TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  description      TEXT,
  meta_title       TEXT,
  meta_description TEXT,
  category         TEXT DEFAULT 'General',
  tags             TEXT[] DEFAULT '{}',
  cover_image      TEXT,
  html_content     TEXT,
  author           TEXT DEFAULT 'Vibe Makers Academy',
  status           TEXT DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  published_at     TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- =============================================================================
-- parent_interest — /parents form
-- =============================================================================
CREATE TABLE IF NOT EXISTS parent_interest (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_name        TEXT NOT NULL,
  parent_email       TEXT NOT NULL,
  student_name       TEXT NOT NULL,
  student_age        TEXT NOT NULL,
  programme_interest TEXT,
  message            TEXT,
  enquiry_type       TEXT NOT NULL DEFAULT 'for_teen',
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Idempotent migration so existing Railway DBs (created pre-2026-05-03)
-- pick up the enquiry_type column without a destructive re-create.
ALTER TABLE parent_interest
  ADD COLUMN IF NOT EXISTS enquiry_type TEXT NOT NULL DEFAULT 'for_teen';

CREATE INDEX IF NOT EXISTS idx_parent_interest_created ON parent_interest(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_parent_interest_enquiry_type ON parent_interest(enquiry_type);

-- =============================================================================
-- school_enquiries — /schools form
-- =============================================================================
CREATE TABLE IF NOT EXISTS school_enquiries (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name         TEXT NOT NULL,
  contact_email        TEXT NOT NULL,
  contact_role         TEXT,
  school_name          TEXT,
  student_level        TEXT,
  number_of_students   TEXT,
  programme_objectives TEXT,
  timing_sessions      TEXT,
  message              TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_school_enquiries_created ON school_enquiries(created_at DESC);

-- =============================================================================
-- hackathon_waitlist — /hackathon form
-- =============================================================================
CREATE TABLE IF NOT EXISTS hackathon_waitlist (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL,
  email             TEXT NOT NULL,
  school            TEXT NOT NULL,
  age_group         TEXT NOT NULL,
  parental_consent  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hackathon_waitlist_created ON hackathon_waitlist(created_at DESC);

-- =============================================================================
-- updated_at trigger for blog_posts
-- =============================================================================
CREATE OR REPLACE FUNCTION trigger_set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER set_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_updated_at();
