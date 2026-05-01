// Thin client for the Railway Postgres-backed blog API.
//
// Replaces the Supabase JS client for blog reads. Same shape as the old
// Supabase row so existing pages (Blog.tsx, BlogPost.tsx) keep their type
// expectations.

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  category: string | null;
  tags: string[] | null;
  cover_image: string | null;
  html_content: string | null;
  author: string | null;
  status: string | null;
  published_at: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

const API_BASE = ""; // same-origin — Hono server serves both API + SPA

export async function listBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${API_BASE}/api/blog`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Blog list failed: ${res.status}`);
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "Unknown blog list error");
  return json.posts as BlogPost[];
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`${API_BASE}/api/blog/${encodeURIComponent(slug)}`, {
    headers: { Accept: "application/json" },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Blog fetch failed: ${res.status}`);
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || "Unknown blog fetch error");
  return json.post as BlogPost;
}
