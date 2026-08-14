# Medicore Healthcore

A claims dashboard built with Next.js (App Router) and Supabase.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a Supabase project at https://supabase.com, then copy `.env.example`
   to `.env.local` and fill in your project URL and anon key (Settings -> API).

3. Create the `claims` table by running `supabase/schema.sql` in the Supabase
   SQL editor.

4. Run the dev server:
   ```bash
   npm run dev
   ```

   Visit http://localhost:3000 — it links to `/medicore/claims`, the claims
   dashboard, and `/medicore/claims/new` to add a claim.

## Project structure

```
app/
  layout.js                     Root layout
  page.js                       Landing page
  medicore/claims/page.js       Claims dashboard (table view)
  medicore/claims/new/page.js   New claim form
lib/
  supabaseClient.js             Shared Supabase browser client
supabase/
  schema.sql                    Table definition for `claims`
```

## Notes

- `ai_status` and `ai_confidence` are stored as plain columns for now — wire
  them up to your own AI coding pipeline whenever that's ready.
- The RLS policy in `schema.sql` is wide open for local development. Lock it
  down (e.g. scope by authenticated user or practice) before deploying with
  real patient data — this app will handle PHI, so review HIPAA-relevant
  access controls before going live.
# medicore-ai-healthcore