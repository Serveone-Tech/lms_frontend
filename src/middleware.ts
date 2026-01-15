import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import appConfig from '@/configs/app.config'

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    // 👇 custom backend token (cookie)
    const token = req.cookies.get('token')?.value

    const isAuthPage =
        pathname === appConfig.unAuthenticatedEntryPath ||
        pathname.startsWith('/sign-up')

    // 🔒 Not logged in → protect all private pages
    if (!token && !isAuthPage) {
        return NextResponse.redirect(
            new URL(appConfig.unAuthenticatedEntryPath, req.url)
        )
    }

    // 🔁 Logged in but visiting login/signup → send to dashboard
    if (token && isAuthPage) {
        return NextResponse.redirect(
            new URL(appConfig.authenticatedEntryPath, req.url)
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next|api|favicon.ico).*)'],
}
