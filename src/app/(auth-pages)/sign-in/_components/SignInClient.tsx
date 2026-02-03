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

const SignInClient = () => {
    const router = useRouter()
    const { refreshSession } = useSessionContext()

    const handleSignIn = async ({
        values,
        setSubmitting,
        setMessage,
    }: OnSignInPayload) => {
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

        // ✅ now refreshSession returns session
        const updatedSession = await refreshSession()

        if (!updatedSession?.user?.id) {
            setMessage('Session not initialized. Please try again.')
            setSubmitting(false)
            return
        }

        await apiIssueBackendToken({
            userId: updatedSession.user.id, // ✅ now string
        })

        router.replace(
            updatedSession.user.role === 'admin'
                ? '/admin/courses'
                : '/dashboard',
        )
    }

    const handleOAuthSignIn = async ({ type }: OnOauthSignInPayload) => {
        if (type === 'google') {
            await handleOauthSignIn(type, '/oauth-success')
        }
    }

    return <SignIn onSignIn={handleSignIn} onOauthSignIn={handleOAuthSignIn} />
}

export default SignInClient
