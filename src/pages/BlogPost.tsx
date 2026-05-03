import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { Layout } from "@/components/layout/Layout";
import { BrutalCard } from "@/components/ui/brutal-card";
import { BrutalSticker } from "@/components/ui/brutal-sticker";
import { BrutalButton } from "@/components/ui/brutal-button";
import { BrutalSectionHeading } from "@/components/ui/brutal-section-heading";
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
            <BrutalCard className="p-8 text-center text-muted-foreground">
              Loading article...
            </BrutalCard>
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
            <BrutalCard className="p-12 text-center">
              <h1 className="font-display font-bold tracking-display text-2xl mb-4 text-foreground">
                Post Not Found
              </h1>
              <p className="text-muted-foreground mb-6">
                The article you're looking for doesn't exist or has been removed.
              </p>
              <BrutalButton variant="primary" size="md" asChild>
                <Link to="/blog" className="hover:no-underline">
                  Back to all posts
                  <span className="vm-arrow">→</span>
                </Link>
              </BrutalButton>
            </BrutalCard>
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
            <BrutalSectionHeading
              eyebrow={post.category || undefined}
              title={post.title}
              size="lg"
              align="left"
            />

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mt-6 mb-8">
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
                    <BrutalSticker
                      key={idx}
                      rotate={idx % 2 === 0 ? -3 : 3}
                      className="text-sm"
                    >
                      {tag}
                    </BrutalSticker>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-border">
              <BrutalButton variant="primary" size="md" asChild>
                <Link to="/blog" className="hover:no-underline">
                  Back to all posts
                  <span className="vm-arrow">→</span>
                </Link>
              </BrutalButton>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default BlogPost;
