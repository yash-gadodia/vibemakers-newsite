import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Layout } from "@/components/layout/Layout";
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
      </Helmet>

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          <span className="vm-sticker" style={{ transform: "rotate(-3deg)" }}>
            ● Stories from the academy
          </span>

          <h1 className="font-display font-bold tracking-display leading-[1.02] text-4xl md:text-5xl mt-6 mb-4">
            Blog
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Notes and stories from the studio — how we build, teach, and think
            about AI coding for teens.
          </p>
        </div>
      </section>

      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-14">
          {isLoading ? (
            <div className="vm-card rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
              Loading posts...
            </div>
          ) : !posts || posts.length === 0 ? (
            <div className="vm-card rounded-2xl border border-border bg-card p-12 text-center">
              <p className="text-muted-foreground text-lg">
                No posts yet — check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="vm-card rounded-2xl border border-border bg-card overflow-hidden block hover:no-underline"
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
                      <span
                        className="vm-sticker inline-block"
                        style={{ transform: "rotate(-3deg)" }}
                      >
                        {post.category}
                      </span>
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
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
