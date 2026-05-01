# Website Improvement Prompt

Read `claude.md` first for full project context.

## Priority 1 — Critical Fixes

### 1. Create Privacy Policy & Terms of Service pages
The footer links to `/privacy` and `/terms` but these routes and pages don't exist. Create both:
- Add routes in `src/App.tsx`
- Create `src/pages/Privacy.tsx` and `src/pages/Terms.tsx`
- Use the same `<Layout>` + `<Helmet>` pattern as other pages
- Content can be placeholder for now but needs proper page structure

### 2. Sanitize blog HTML content
`src/pages/BlogPost.tsx` uses `dangerouslySetInnerHTML` without sanitization. Install DOMPurify and sanitize all HTML content before rendering. This is a security vulnerability.

### 3. Fix hardcoded colors in builder-input.tsx
`src/components/ui/builder-input.tsx` uses hardcoded Tailwind colors (blue-500, slate-800, green-600, purple-50, pink-50) instead of design system tokens. Replace all with the project's CSS variable-based classes (primary, secondary, accent, muted, muted-foreground, etc.). Reference `src/index.css` for the token definitions.

## Priority 2 — Performance & Type Safety

### 4. Optimize images
- Compress `src/assets/faculty/pei-song.jpg` from 1.7MB to ~100KB
- Convert large PNGs in `src/assets/gallery/` to WebP with fallbacks
- Add `loading="lazy"` to all below-fold images
- Consider using a responsive image solution (srcset or a component wrapper)

### 5. Replace TypeScript `any` types
Create proper interfaces and replace `any` in:
- `src/pages/Admin.tsx` (line 18): `useState<any[]>` → proper submission types
- `src/pages/Blog.tsx` (line 32): unsafe cast
- `src/pages/BlogPost.tsx` (lines 40, 51): `"blog_posts" as any`
- `src/components/admin/SubmissionsTable.tsx` (lines 3-4): `any[]` and `any` props
- `src/lib/sendNotification.ts`: `Record<string, any>`

### 6. Clean up console statements
Remove or replace `console.error()` calls in production code:
- `src/contexts/AuthContext.tsx`
- `src/pages/NotFound.tsx`
- `src/pages/Admin.tsx`
- `src/lib/sendNotification.ts`
Replace with proper error boundary or reporting service if needed.

## Priority 3 — UX & Content Gaps

### 7. Mobile responsiveness
- `src/components/home/HeroSection.tsx`: Carousel is hidden below `lg` breakpoint. Show a static image or simplified carousel at `md`.
- Audit all hero/feature sections for tablet breakpoint (768-1024px)

### 8. Hackathon page event details
`src/pages/Hackathon.tsx` has dates in JSON-LD but not displayed in UI. Add visible event date, time, venue, and registration deadline.

### 9. Blog enhancements
- Add search functionality (text search across titles and descriptions)
- Add "related posts" section to individual blog pages
- Add loading indicator when filtering by tag

### 10. Admin improvements
- Add CSV export for parent interest, school enquiries, and hackathon waitlist
- Add proper TypeScript types (see #5)

## Priority 4 — Polish

### 11. Create `.env.example`
Document all required `VITE_` environment variables so new developers can onboard.

### 12. Add `@media print` styles
Optimize `src/pages/PrintFlyer.tsx` and `src/pages/PrintSlides.tsx` for actual print output.

### 13. Split large components
- `src/components/ui/sidebar.tsx` (637 lines) — extract sub-components
- `src/components/admin/flyers/SchoolOutreachFlyer.tsx` (447 lines) — extract sections
