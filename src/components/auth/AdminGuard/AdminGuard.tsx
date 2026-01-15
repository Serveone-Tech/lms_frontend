'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        if (user.role !== 'admin') {
            router.replace('/dashboard')
        }
    }, [router])

    return <>{children}</>
}
