'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { User } from 'next-auth'

type Session = {
    user: (User & Record<string, any>) | null
    expires: string | null
}

type SessionContextType = {
    session: Session | null
    loading: boolean
    refreshSession: () => Promise<void>
    clearSession: () => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchSession = async () => {
        try {
            const res = await fetch('/api/auth/session', {
                credentials: 'include',
            })

            if (!res.ok) {
                setSession(null)
                return
            }

            const data = await res.json()

            setSession({
                user: data.user ?? null,
                expires: data.expires ?? null,
            })
        } catch {
            setSession(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSession()
    }, [])

    const refreshSession = async () => {
        setLoading(true)
        await fetchSession()
    }

    const clearSession = () => {
        setSession(null)
        setLoading(false)
    }

    return (
        <SessionContext.Provider
            value={{
                session,
                loading,
                refreshSession,
                clearSession,
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}

export function useSessionContext() {
    const context = useContext(SessionContext)
    if (!context) {
        throw new Error(
            'useSessionContext must be used within SessionProvider'
        )
    }
    return context
}

export default SessionContext
