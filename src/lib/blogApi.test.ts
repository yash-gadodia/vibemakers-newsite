import { describe, it, expect, vi, afterEach } from "vitest";
import { listBlogPosts, getBlogPost } from "./blogApi";

describe("blogApi", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("listBlogPosts", () => {
    it("returns the posts array on a 200 ok response", async () => {
      const posts = [{ id: "1", title: "Hello", slug: "hello" }];
      vi.spyOn(global, "fetch").mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ ok: true, posts }),
      } as unknown as Response);

      const result = await listBlogPosts();
      expect(result).toEqual(posts);
    });

    it("throws when the HTTP response is not ok", async () => {
      vi.spyOn(global, "fetch").mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({}),
      } as unknown as Response);
      await expect(listBlogPosts()).rejects.toThrow(/500/);
    });

    it("throws when the JSON body has ok:false", async () => {
      vi.spyOn(global, "fetch").mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ ok: false, error: "table missing" }),
      } as unknown as Response);
      await expect(listBlogPosts()).rejects.toThrow(/table missing/);
    });
  });

  describe("getBlogPost", () => {
    it("returns null when the slug is not found (404)", async () => {
      vi.spyOn(global, "fetch").mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({}),
      } as unknown as Response);
      const post = await getBlogPost("does-not-exist");
      expect(post).toBeNull();
    });

    it("returns the post on a 200 response", async () => {
      const post = { id: "1", title: "Hello", slug: "hello", html_content: "<p>hi</p>" };
      vi.spyOn(global, "fetch").mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ ok: true, post }),
      } as unknown as Response);
      const result = await getBlogPost("hello");
      expect(result).toEqual(post);
    });

    it("URL-encodes the slug into the path", async () => {
      const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ ok: true, post: null }),
      } as unknown as Response);
      await getBlogPost("hello world/2");
      expect(fetchSpy.mock.calls[0][0]).toBe("/api/blog/hello%20world%2F2");
    });

    it("throws on non-404 error responses", async () => {
      vi.spyOn(global, "fetch").mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({}),
      } as unknown as Response);
      await expect(getBlogPost("hello")).rejects.toThrow(/500/);
    });
  });
});
