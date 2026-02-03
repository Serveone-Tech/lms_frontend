'use server'

import { signIn } from '@/auth'

const handleOauthSignIn = async (
    signInMethod: string,
    callbackUrl?: string,
) => {
    await signIn(signInMethod, {
        redirectTo: callbackUrl || '/oauth-success',
    })
}

export default handleOauthSignIn
