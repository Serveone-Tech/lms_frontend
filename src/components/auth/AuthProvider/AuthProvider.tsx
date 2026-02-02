'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import { SessionProvider } from './SessionContext'
import type { Session } from 'next-auth'

type AuthProviderProps = {
    session: Session | null
    children: React.ReactNode
}

const AuthProvider = ({ session, children }: AuthProviderProps) => {
    return (
        <NextAuthSessionProvider
            session={session}
            refetchOnWindowFocus={false}
        >
            <SessionProvider initialSession={session}>
                {children}
            </SessionProvider>
        </NextAuthSessionProvider>
    )
}

export default AuthProvider
