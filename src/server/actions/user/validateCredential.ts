'use server'

import type { SignInCredential } from '@/@types/auth'
import { apiSignIn } from '@/services/AuthService'

const validateCredential = async (values: SignInCredential) => {
    try {
        const response = await apiSignIn(values)
        return response
    } catch (error) {
        return null
    }
}

export default validateCredential
