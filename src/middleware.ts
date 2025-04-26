import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const publicRoutes = [
  '/sign-in',
  '/sign-up',
  '/favicon.ico',
  '/_next',
]

const protectedRoutes = [
  '/',
  '/dashboard/:path*',
]

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // 1) —–––––––––––––––––––– CORS –––––––––––––––––––––––
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (request.method === 'OPTIONS') {
    return response
  }

  // 2) —––––––––––––––– AUTHENTICATION ––––––––––––––––––
  const { pathname } = request.nextUrl

  const isPublic = publicRoutes.some((rt) => pathname.startsWith(rt))
  const isProtected = protectedRoutes.some((rt) => {
    const base = rt.replace('/:path*', '')
    return pathname === base || pathname.startsWith(base + '/')
  })

  if (isProtected && !isPublic) {
    // buat supabase client pake cookie dari request
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: cookiesToSet =>
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            ),
        },
      }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/api/:path*',
    '/',
    '/dashboard/:path*',
  ],
}
