import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('token')?.value

  const isApi = pathname.startsWith('/api')
  const isAuth = pathname === '/login' || pathname === '/signup'
  const isPublic =
    pathname === '/' ||
    pathname === '/about' ||
    pathname === '/how-it-works' ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico'

  if (!token) {
    if (isApi || isAuth || isPublic) return NextResponse.next()
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
