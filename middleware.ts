import { createServerClient } from '@supabase/ssr'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const { pathname } = req.nextUrl;
    
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name) {
                    return req.cookies.get(name)?.value
                },
                set(name, value, options) {
                    res.cookies.set({ name, value, ...options })
                }
            },
        }
    )
    const { data, error } = await supabase.auth.getUser()
    if (pathname.startsWith('/admin') && (!data.user || error)) {
        const loginUrl = new URL('/admin/login', req.url)
        return NextResponse.redirect(loginUrl)
    }
    return res
}
export const config = {
    matcher: ['/admin/:path*'],
}
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Ada Kunci' : 'Kunci KOSONG!');