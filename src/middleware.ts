import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import appConfig from '@/configs/app.config'

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    // ✅ PUBLIC / STATIC PATHS
    if (
        pathname.startsWith('/api/auth') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.startsWith('/uploads') ||
        pathname.startsWith('/img') ||
        pathname.startsWith('/images') ||
        pathname.startsWith('/forgot-password') ||
        pathname.startsWith('/reset-password') ||
        pathname.startsWith('/otp-verification') ||
        pathname.startsWith('/sign-in') ||
        pathname.startsWith('/sign-up')
    ) {
        return NextResponse.next()
    }

    // 🔐 NextAuth token
    const nextAuthToken = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })

    // 🔐 Backend JWT cookie (custom auth)
    const backendToken = req.cookies.get('token')?.value

    const isAuthPage =
        pathname === appConfig.unAuthenticatedEntryPath ||
        pathname.startsWith('/sign-up') ||
        pathname.startsWith('/forgot-password') ||
        pathname.startsWith('/reset-password')

    // 🔒 PROTECTED ROUTES
    // ❗ allow if ANY auth token exists
    if (!nextAuthToken && !backendToken && !isAuthPage) {
        return NextResponse.redirect(
            new URL(appConfig.unAuthenticatedEntryPath, req.url)
        )
    }

    // 🔁 AUTH PAGES (user already logged in)
    if ((nextAuthToken || backendToken) && isAuthPage) {
        return NextResponse.redirect(
            new URL(appConfig.authenticatedEntryPath, req.url)
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
