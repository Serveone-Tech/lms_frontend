import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import appConfig from '@/configs/app.config'

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    /**
     * =============================
     * 1️⃣ PUBLIC / STATIC ROUTES
     * =============================
     */
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.startsWith('/img') ||
        pathname.startsWith('/images') ||
        pathname.startsWith('/uploads') ||
        pathname.startsWith('/sign-in') ||
        pathname.startsWith('/sign-up') ||
        pathname.startsWith('/forgot-password') ||
        pathname.startsWith('/reset-password') ||
        pathname.startsWith('/otp-verification')
    ) {
        return NextResponse.next()
    }

    /**
     * =============================
     * 2️⃣ AUTH CHECK
     * =============================
     */

    // NextAuth session (google / credentials)
    const nextAuthToken = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })

    // Backend JWT (custom login)
    const backendToken = req.cookies.get('token')?.value

    const isLoggedIn = Boolean(nextAuthToken || backendToken)

    /**
     * =============================
     * 3️⃣ PROTECTED ROUTES
     * =============================
     */
    if (!isLoggedIn) {
        return NextResponse.redirect(
            new URL(appConfig.unAuthenticatedEntryPath, req.url)
        )
    }

    /**
     * =============================
     * 4️⃣ AUTH PAGES (BLOCK WHEN LOGGED IN)
     * =============================
     */
    if (
        isLoggedIn &&
        (pathname === appConfig.unAuthenticatedEntryPath ||
            pathname.startsWith('/sign-up'))
    ) {
        return NextResponse.redirect(
            new URL(appConfig.authenticatedEntryPath, req.url)
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
