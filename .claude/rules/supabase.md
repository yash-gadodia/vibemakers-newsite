---
description: Supabase conventions for the Vibe Makers site (client usage, schema changes, edge functions)
paths:
  - "src/**"
  - "supabase/**"
---

# Supabase Rules

## Auto-generated — NEVER edit by hand
- `src/integrations/supabase/client.ts`
- `src/integrations/supabase/types.ts`
- `supabase/config.toml`

These are regenerated from the remote Supabase project. Editing them will be overwritten. To change types, update the remote schema and regenerate.

## Client usage
- Import: `import { supabase } from "@/integrations/supabase/client"` — never construct a new client
- Types: `import type { Database } from "@/integrations/supabase/types"` (or the specific `Row`/`Insert`/`Update` types from that file)
- For TanStack Query, wrap Supabase calls inside `queryFn` — don't call Supabase from render

## Auth
- Auth state lives in `@/contexts/AuthContext`
- The listener ordering (`onAuthStateChange` before `getSession`) is intentional to avoid a stale-state race — don't reorder
- The admin role check runs inside `setTimeout(0)` to avoid a Supabase client deadlock — leave it
- `isAdmin` is derived from a `user_roles` row where `role = 'admin'` — never trust `user.user_metadata` for roles
- Every admin-only UI path MUST gate on `isAdmin` from `useAuth()`

## Tables
Current tables (see `src/integrations/supabase/types.ts` for exact columns):
- `admin_invites`, `api_keys`, `blog_posts`, `hackathon_waitlist`, `parent_interest`, `school_enquiries`, `user_roles`

## Edge functions
- Live in `supabase/functions/<name>/index.ts` (Deno)
- Current functions: `invite-admin`, `receive-article`, `send-notification-email`
- Invoke from frontend: `supabase.functions.invoke("<name>", { body: {...} })`
- For notifications specifically, use the existing helper `sendNotificationEmail(formType, data)` in `@/lib/sendNotification` — don't duplicate its fire-and-forget semantics

## Forms → DB pattern
1. zod schema → react-hook-form (`zodResolver`)
2. On submit: `supabase.from("<table>").insert(data)`
3. Handle the `error` case (toast + log)
4. Fire-and-forget `sendNotificationEmail(formType, data)`
5. Show success toast + reset form

## Schema changes
- Propose the change to the user before applying it
- Apply in the Supabase dashboard / migration tooling
- Regenerate types (`supabase gen types typescript ...`) — don't hand-edit `types.ts`
- Update any RLS policies the change requires

## Don't
- Don't hardcode Supabase URLs or keys — they're already in `client.ts` (anon key only, safe for the browser)
- Don't write admin actions that bypass `user_roles` (e.g., by setting a JWT claim) — we explicitly use the table
- Don't ship code that assumes a specific JWT shape; rely on `supabase.auth.getUser()` / session
