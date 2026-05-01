import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { Layout } from "@/components/layout/Layout";
import { getBlogPost, type BlogPost } from "@/lib/blogApi";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery<BlogPost | null>({
    queryKey: ["blog_post", slug],
    queryFn: () => (slug ? getBlogPost(slug) : Promise.resolve(null)),
    enabled: !!slug,
  });

  const sanitizedHtml = useMemo(() => {
    if (!post?.html_content) return "";
    return DOMPurify.sanitize(post.html_content);
  }, [post?.html_content]);

  if (isLoading) {
    return (
      <Layout>
        <Helmet>
          <title>Loading... · Vibemakers Academy</title>
        </Helmet>
        <section className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6 md:px-14">
            <div className="vm-card rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
              Loading article...
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <Helmet>
          <title>Post Not Found · Vibemakers Academy</title>
        </Helmet>
        <section className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6 md:px-14">
            <div className="vm-card rounded-2xl border border-border bg-card p-12 text-center">
              <h1 className="font-display font-bold tracking-display text-2xl mb-4 text-foreground">
                Post Not Found
              </h1>
              <p className="text-muted-foreground mb-6">
                The article you're looking for doesn't exist or has been removed.
              </p>
              <Link
                to="/blog"
                className="vm-btn inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground shadow-sticker hover:no-underline"
              >
                Back to all posts
                <span className="vm-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>
          {post.meta_title || post.title} · Vibemakers Academy
        </title>
        <meta
          name="description"
          content={post.meta_description || post.description || ""}
        />
        <link
          rel="canonical"
          href={`https://vibemakers.dev/blog/${post.slug}`}
        />
        {post.cover_image && (
          <>
            <meta property="og:image" content={post.cover_image} />
            <meta name="twitter:image" content={post.cover_image} />
          </>
        )}
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta
          property="og:description"
          content={post.meta_description || post.description || ""}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://vibemakers.dev/blog/${post.slug}`} />
      </Helmet>

      <article>
        <section className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6 md:px-14">
            {post.category && (
              <span
                className="vm-sticker inline-block"
                style={{ transform: "rotate(-3deg)" }}
              >
                {post.category}
              </span>
            )}

            <h1 className="font-display font-bold tracking-display leading-[1.02] text-4xl md:text-5xl mt-6 mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
              {post.author && <span className="font-medium">{post.author}</span>}
              {post.author && post.published_at && (
                <span className="text-ink-2">·</span>
              )}
              {post.published_at && (
                <span>
                  {format(new Date(post.published_at), "MMMM d, yyyy")}
                </span>
              )}
            </div>

            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full rounded-2xl mb-12 object-cover"
              />
            )}
          </div>
        </section>

        <section className="bg-background py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-6 md:px-14">
            <div
              className="prose prose-stone max-w-none text-foreground"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />

            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-sm font-medium text-ink-2 mb-4">Tags</p>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="vm-sticker text-sm"
                      style={{
                        transform: `rotate(${idx % 2 === 0 ? -3 : 3}deg)`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-border">
              <Link
                to="/blog"
                className="vm-btn inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground shadow-sticker hover:no-underline"
              >
                Back to all posts
                <span className="vm-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default BlogPost;
