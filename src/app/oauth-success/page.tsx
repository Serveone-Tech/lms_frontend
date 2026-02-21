'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSessionContext } from '@/components/auth/AuthProvider/SessionContext'
import axios from 'axios'

const OAuthSuccessPage = () => {
    const router = useRouter()
    const { refreshSession } = useSessionContext()

    useEffect(() => {
        const run = async () => {
            // 1️⃣ NextAuth session lao
            const session = await refreshSession()

            if (!session?.user?.email) {
                router.replace('/sign-in')
                return
            }

            // 2️⃣ 🔥 BACKEND GOOGLE SIGNUP API CALL (TOKEN ISSUED HERE)
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/googlesignup`,
                {
                    userName:
                        session.user.userName ||
                        session.user.email ||
                        session.user.email.split('@')[0],
                    email: session.user.email,
                    role: 'user',
                },
                {
                    withCredentials: true,
                },
            )

            const backendUser = res.data

            // 3️⃣ Role based redirect
            router.replace(
                backendUser.role === 'admin'
                    ? '/admin/courses'
                    : '/dashboard',
            )
        }

        run()
    }, [])

    return <div className="p-6">Signing you in with Google…</div>
}

export default OAuthSuccessPage
