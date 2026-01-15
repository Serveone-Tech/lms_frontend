'use client'

import SignIn from '@/components/auth/SignIn'
import handleOauthSignIn from '@/server/actions/auth/handleOauthSignIn'
import { useRouter } from 'next/navigation'
import type {
    OnSignInPayload,
    OnOauthSignInPayload,
} from '@/components/auth/SignIn'
import { apiSignIn } from '@/services/AuthService'

const SignInClient = () => {
    const router = useRouter()

    const handleSignIn = async ({
        values,
        setSubmitting,
        setMessage,
    }: OnSignInPayload) => {
        setSubmitting(true)

        try {
            const res = await apiSignIn(values)
            localStorage.setItem('user', JSON.stringify(res))
            console.log('Signed in user:',res.role)
            if (res.role === 'admin') {
                router.push('/admin/courses')
            } else {
                router.push('/dashboard')
            }
        } catch (err: any) {
            setMessage(err?.response?.data?.message || 'Invalid credentials')
            setSubmitting(false)
        }
    }
    const handleOAuthSignIn = async ({ type }: OnOauthSignInPayload) => {
        if (type === 'google') {
            await handleOauthSignIn('google')
        }
        if (type === 'github') {
            await handleOauthSignIn('github')
        }
    }

    return <SignIn onSignIn={handleSignIn} onOauthSignIn={handleOAuthSignIn} />
}

export default SignInClient
