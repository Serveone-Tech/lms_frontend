import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import appConfig from '@/configs/app.config'

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    // ✅ PUBLIC / STATIC PATHS (NO AUTH)
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

    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })

    const isAuthPage =
        pathname === appConfig.unAuthenticatedEntryPath ||
        pathname.startsWith('/sign-up') ||
        pathname.startsWith('/forgot-password') ||
        pathname.startsWith('/reset-password')

    // 🔒 Protected routes
    if (!token && !isAuthPage) {
        return NextResponse.redirect(
            new URL(appConfig.unAuthenticatedEntryPath, req.url)
        )
    }

    // 🔁 Logged-in user visiting auth pages
    if (token && isAuthPage) {
        return NextResponse.redirect(
            new URL(appConfig.authenticatedEntryPath, req.url)
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
