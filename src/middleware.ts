import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const session = req.cookies.get('next-auth.session-token')
    const protectedPaths = ['/dashboard', '/settings', '/sales', '/customers', '/purchases', '/suppliers', '/reports', '/users']; if (session) {
        if (pathname == '/') {
            return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
        }
    }
    if (protectedPaths.includes(pathname)) {
        if (!session) { // Replace `isAuthenticated` with your actual authentication function
            return NextResponse.redirect(new URL('/', req.url)); // Assuming '/login' is your login URL
        }
        return NextResponse.next();
    }
    return NextResponse.next()
}
// Middleware configuration
export const config = {
    matcher: ['/', '/dashboard', '/settings', '/sales', '/customers', '/purchases', '/suppliers', '/reports', '/users',
        '/dashboard/:path*', '/settings/:path*', '/sales/:path*', '/customers/:path*', '/purchases/:path*', '/suppliers/:path*', '/reports/:path*', '/users/:path*'
    ],
}
