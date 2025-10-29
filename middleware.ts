import { createServerClient } from '@supabase/ssr'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    
    console.log('🔍 Middleware running for:', pathname);
    
    // Skip middleware untuk halaman login
    if (pathname === '/admin/login') {
        console.log('✅ Skipping middleware for login page');
        return NextResponse.next()
    }
    
    // Cek environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
        console.error('❌ Supabase credentials missing!')
        return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    
    // Create response FIRST before creating Supabase client
    let res = NextResponse.next({
        request: {
            headers: req.headers,
        },
    })
    
    const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                get(name) {
                    return req.cookies.get(name)?.value
                },
                set(name, value, options) {
                    // Set cookie on both request and response
                    req.cookies.set({ name, value, ...options })
                    res.cookies.set({ name, value, ...options })
                },
                remove(name, options) {
                    // Remove cookie on both request and response
                    req.cookies.set({ name, value: '', ...options })
                    res.cookies.set({ name, value: '', ...options })
                }
            },
        }
    )
    
    // Cek authentication dengan getSession dan getUser
    const { data: sessionData } = await supabase.auth.getSession()
    const { data: userData, error } = await supabase.auth.getUser()
    
    const hasValidSession = sessionData?.session !== null
    const hasValidUser = userData?.user !== null && !error
    
    console.log('🔐 Auth check:', { 
        pathname, 
        hasValidSession,
        hasValidUser,
        error: error?.message,
        userId: userData?.user?.id,
        sessionExists: !!sessionData?.session,
        cookies: req.cookies.getAll().map(c => c.name)
    });
    
    // Redirect ke login jika tidak ada session atau user yang valid
    if (!hasValidSession || !hasValidUser) {
        console.log('🚫 Unauthorized access to:', pathname, '- Redirecting to login');
        const redirectUrl = new URL('/admin/login', req.url)
        return NextResponse.redirect(redirectUrl)
    }
    
    console.log('✅ Access granted to:', pathname);
    return res
}

export const config = {
    matcher: [
        // Jalankan middleware untuk semua route admin
        '/admin/:path*',
    ],
}