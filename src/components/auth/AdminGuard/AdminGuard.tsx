'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useCurrentSession from '@/utils/hooks/useCurrentSession'

export default function AdminGuard({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const { session } = useCurrentSession()
    useEffect(() => {

        if (!session) return

        // ❌ logged in but not admin
        if (session.user?.role !== 'admin') {
            router.replace('/dashboard')
        }
    }, [session, router])

    // ⏳ avoid flicker
    if (!session) return null

    return <>{children}</>
}
