-- Add missing columns to blog_posts
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'General',
ADD COLUMN IF NOT EXISTS author TEXT DEFAULT 'Vibe Makers Team';

-- Add indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);