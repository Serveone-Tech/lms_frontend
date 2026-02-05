'use client'

import SignIn from '@/components/auth/SignIn'
import handleOauthSignIn from '@/server/actions/auth/handleOauthSignIn'
import { useRouter } from 'next/navigation'
import type {
    OnSignInPayload,
    OnOauthSignInPayload,
} from '@/components/auth/SignIn'
import { signIn } from 'next-auth/react'
import { apiIssueBackendToken } from '@/services/AuthService'
import { useSessionContext } from '@/components/auth/AuthProvider/SessionContext'

declare module 'next-auth' {
    interface User {
        role?: string
    }
}

const SignInClient = () => {
    const router = useRouter()
    const { refreshSession } = useSessionContext()

    const handleSignIn = async ({
        values,
        setSubmitting,
        setMessage,
    }: OnSignInPayload) => {
        try {
            setSubmitting(true)

            const res = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
            })

            if (res?.error) {
                setMessage('Invalid credentials')
                setSubmitting(false)
                return
            }

            // ⏳ wait a bit for session to sync
            await new Promise((r) => setTimeout(r, 300))

            const updatedSession = await refreshSession()

            if (!updatedSession?.user?.id) {
                throw new Error('Session not ready')
            }

            await apiIssueBackendToken({
                userId: updatedSession.user.id,
            })

            // ✅ HARD redirect (more reliable than router.replace)
            window.location.href =
                updatedSession.user.role === 'admin'
                    ? '/admin/courses'
                    : '/dashboard'
        } catch (err) {
            console.error(err)
            setMessage('Login failed, please try again')
            setSubmitting(false)
        }
    }

    const handleOAuthSignIn = async ({ type }: OnOauthSignInPayload) => {
        if (type === 'google') {
            await handleOauthSignIn(type, '/oauth-success')
        }
    }

    return <SignIn onSignIn={handleSignIn} onOauthSignIn={handleOAuthSignIn} />
}

export default SignInClient
