import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Use fallback empty strings to prevent build crashes if env vars are missing
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy_key'
  )
}

