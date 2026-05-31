import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Layout } from "@/components/layout/Layout";
import { BrutalCard } from "@/components/ui/brutal-card";
import { BrutalSticker } from "@/components/ui/brutal-sticker";
import { BrutalSectionHeading } from "@/components/ui/brutal-section-heading";
import { listBlogPosts, type BlogPost } from "@/lib/blogApi";

const Blog = () => {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["blog_posts"],
    queryFn: listBlogPosts,
  });

  return (
    <Layout>
      <Helmet>
        <title>Blog · Vibemakers Academy</title>
        <meta
          name="description"
          content="Stories, insights, and updates from Vibemakers Academy — Singapore's AI-first coding academy for teens."
        />
        <link rel="canonical" href="https://vibemakers.dev/blog" />
        <meta property="og:title" content="Blog · Vibemakers Academy" />
        <meta property="og:description" content="Stories, insights, and updates from Vibemakers Academy — Singapore's AI-first coding academy for teens." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://vibemakers.dev/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <BrutalSectionHeading
            eyebrow="● Stories from the academy"
            title="Blog"
            sub="Notes and stories from the studio — how we build, teach, and think about AI coding for teens."
            size="lg"
            align="left"
          />
        </div>
      </section>

      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          {isLoading ? (
            <BrutalCard className="p-8 text-center text-muted-foreground">
              Loading posts...
            </BrutalCard>
          ) : !posts || posts.length === 0 ? (
            <BrutalCard className="p-12 text-center">
              <p className="text-muted-foreground text-lg">
                No posts yet — check back soon.
              </p>
            </BrutalCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BrutalCard key={post.id} className="overflow-hidden">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="block hover:no-underline"
                  >
                    {post.cover_image && (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    )}

                    <div className="p-6">
                      {post.category && (
                        <BrutalSticker rotate={-3}>
                          {post.category}
                        </BrutalSticker>
                      )}

                      <h2 className="font-display font-bold tracking-display text-2xl mt-4 mb-3 text-foreground">
                        {post.title}
                      </h2>

                      {post.description && (
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {post.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-sm text-ink-2">
                        {post.author && (
                          <span className="font-medium">{post.author}</span>
                        )}
                        {post.published_at && (
                          <span className="text-muted-foreground">
                            {format(
                              new Date(post.published_at),
                              "MMM d, yyyy"
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </BrutalCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
