import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('token')?.value
  const userRole = req.cookies.get('userRole')?.value

  const isApi = pathname.startsWith('/api')
  const isAuth = pathname === '/login' || pathname === '/signup'
  const isAdmin = pathname.startsWith('/admin')
  const isPublicAsset =
    pathname.startsWith('/logo') ||
    pathname.startsWith('/videos') ||
    pathname.startsWith('/images') ||
    /\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|woff2?)$/i.test(pathname)
  const isPublic =
    pathname === '/' ||
    pathname === '/about' ||
    pathname === '/how-it-works' ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    isPublicAsset

  if (!token) {
    if (isApi || isAuth || isPublic) return NextResponse.next()
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isAuth) {
    return NextResponse.redirect(new URL('/hub', req.url))
  }

  if (isAdmin && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/hub', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
