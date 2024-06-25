import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const secret = process.env.NEXTAUTH_SECRET;
export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret })
    const { pathname } = req.nextUrl
    const session = req.cookies.get('__Secure-next-auth.session-token') || req.cookies.get('next-auth.session-token')
    const protectedPathsWorker = [
        '/dashboard',
        '/settings',
        '/settings/company',
        '/settings/sitelist',
        '/settings/taxlist',
        '/settings/unitlist',
        '/settings/payment-type',
        '/sales',
        '/sales/pos',
        '/sales/new-sales',
        '/sales/sales-list',
        '/sales/new-return',
        '/sales/return-list',
        '/customers',
        '/customers/new',
        '/customers/list',
        '/customers/import',
        '/sales/invoice',
        '/purchase/invoice'
    ];
    if (session) {
        if (pathname == '/') {
            return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
        }
        if (token?.role == 'admin') {
            return NextResponse.next();

        }
        if (token?.role == 'worker') {
            if (protectedPathsWorker.includes(pathname)) {
                return NextResponse.next();
            }
            return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
        }
    }
    if (!session && pathname != '/') {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }
    return NextResponse.next()
}
// Middleware configuration
export const config = {
    matcher: ['/', '/dashboard', '/settings', '/sales', '/customers', '/purchases', '/suppliers', '/reports', '/users',
        '/dashboard/:path*', '/items/:path*', '/settings/:path*', '/sales/:path*', '/customers/:path*', '/purchases/:path*', '/suppliers/:path*', '/reports/:path*', '/users/:path*'
    ],
}
