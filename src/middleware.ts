import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import appConfig from '@/configs/app.config'

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    // Public paths
    if (
        pathname.startsWith('/api/auth') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon.ico')
    ) {
        return NextResponse.next()
    }

    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })

    const isAuthPage =
        pathname === appConfig.unAuthenticatedEntryPath ||
        pathname.startsWith('/sign-up')

    // 🔒 Not logged in
    if (!token && !isAuthPage) {
        return NextResponse.redirect(
            new URL(appConfig.unAuthenticatedEntryPath, req.url)
        )
    }

    // 🔁 Logged in but visiting login
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
