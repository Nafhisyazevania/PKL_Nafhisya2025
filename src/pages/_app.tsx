import '@/styles/globals.css'
import { useState } from 'react'
import { createBrowserClient, createServerClient } from '@supabase/ssr'
import type { Session } from '@supabase/supabase-js'

export default function App({ Component, pageProps }: any) {
  const [supabaseClient] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  )

  return <Component {...pageProps} supabase={supabaseClient} />
}
