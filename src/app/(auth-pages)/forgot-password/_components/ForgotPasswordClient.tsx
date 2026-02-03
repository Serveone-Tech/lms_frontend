'use client'

import { apiForgotPassword } from '@/services/AuthService'
import ForgotPassword from '@/components/auth/ForgotPassword'
import { toast } from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import type { OnForgotPasswordSubmitPayload } from '@/components/auth/ForgotPassword'
import { useRouter } from 'next/navigation'

const ForgotPasswordClient = () => {
    const router = useRouter()
    const handleForgotPasswordSubmit = async ({
        values,
        setSubmitting,
        setMessage,
        setEmailSent,
    }: OnForgotPasswordSubmitPayload) => {
        try {
            setSubmitting(true)
            await apiForgotPassword(values)
            toast.push(
                <Notification title="Email sent!" type="success">
                    We have sent you an email to reset your password
                </Notification>,
            )
            router.replace(`/otp-verification?email=${values.email}`)
            setEmailSent(true)
        } catch (error) {
            setMessage(error as string)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <ForgotPassword onForgotPasswordSubmit={handleForgotPasswordSubmit} />
    )
}

export default ForgotPasswordClient
