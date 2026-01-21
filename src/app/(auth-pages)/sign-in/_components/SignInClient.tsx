'use client'

import SignIn from '@/components/auth/SignIn'
import handleOauthSignIn from '@/server/actions/auth/handleOauthSignIn'
import { useRouter } from 'next/navigation'
import type {
    OnSignInPayload,
    OnOauthSignInPayload,
} from '@/components/auth/SignIn'
import { getSession, signIn } from 'next-auth/react'
import { apiIssueBackendToken } from '@/services/AuthService'

const SignInClient = () => {
    const router = useRouter()

    const handleSignIn = async ({
        values,
        setSubmitting,
        setMessage,
    }: OnSignInPayload) => {
        setSubmitting(true)

        const res = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false, // 🔴 MUST
        })

        console.log('SignIn result:', res)

        if (res?.error) {
            setMessage('Invalid credentials')
            setSubmitting(false)
            return
        }

        // ✅ session refresh
        const session = await getSession()
        console.log('Session after login:', session)
        apiIssueBackendToken()
        setSubmitting(false) // ✅ IMPORTANT

        if (session?.user?.role === 'admin') {
            router.replace('/admin/courses')
        } else {
            router.replace('/dashboard')
        }
    }

    const handleOAuthSignIn = async ({ type }: OnOauthSignInPayload) => {
        await handleOauthSignIn(type)

        // 🔥 OAuth ke baad session already set hota hai
        const session = await getSession()

        if (session?.user?.role === 'admin') {
            router.replace('/admin/courses')
        } else {
            router.replace('/dashboard')
        }
    }

    return <SignIn onSignIn={handleSignIn} onOauthSignIn={handleOAuthSignIn} />
}

export default SignInClient
