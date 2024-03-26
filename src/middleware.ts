import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const session = req.cookies.get('next-auth.session-token')
    if (pathname == '/') {
        if (session) {
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }
    }
    // Redirect to sign-in page if trying to access a protected route without being authenticated
    if (pathname.startsWith('/dashboard')) {
        if (!session) {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }
    return NextResponse.next()
}
// Middleware configuration
export const config = {
    matcher: ['/', '/dashboard/:path*'],
}
