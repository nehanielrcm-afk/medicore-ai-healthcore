import { createClient } from '@supabase/supabase-js'

let cachedClient = null

// Lazily creates a single Supabase client instance for the browser.
// Reused across components instead of creating a new connection every render.
export function getSupabaseClient() {
  if (cachedClient) return cachedClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error(
      'Missing Supabase env vars. Copy .env.example to .env.local and fill in your project URL and anon key.'
    )
  }

  cachedClient = createClient(url, anonKey)
  return cachedClient
}