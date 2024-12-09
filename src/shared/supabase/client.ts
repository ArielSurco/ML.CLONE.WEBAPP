import { createBrowserClient } from '@supabase/ssr'

import { type Database } from './supabase'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

  return createBrowserClient<Database>(supabaseUrl, supabaseKey)
}
