// src/lib/supabase-server.ts
// Server-side Supabase client untuk API routes
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
}

export const supabaseServer = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: false, // Tidak perlu persist session di server
    }
})

