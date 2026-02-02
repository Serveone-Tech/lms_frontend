'use client'

import { createContext, useContext, useState } from 'react'
import { getSession } from 'next-auth/react'
import type { Session } from 'next-auth'

type SessionContextType = {
    session: Session | null
    loading: boolean
    refreshSession: () => Promise<Session | null>
    clearSession: () => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export const SessionProvider = ({
    children,
    initialSession,
}: {
    children: React.ReactNode
    initialSession: Session | null
}) => {
    const [session, setSession] = useState<Session | null>(initialSession)
    const [loading, setLoading] = useState(false)

    const refreshSession = async () => {
        setLoading(true)
        const updatedSession = await getSession()
        setSession(updatedSession)
        setLoading(false)
        return updatedSession   
    }

    const clearSession = () => {
        setSession(null)
    }

    return (
        <SessionContext.Provider
            value={{ session, loading, refreshSession, clearSession }}
        >
            {children}
        </SessionContext.Provider>
    )
}

export const useSessionContext = () => {
    const ctx = useContext(SessionContext)
    if (!ctx) {
        throw new Error('useSessionContext must be used within SessionProvider')
    }
    return ctx
}
