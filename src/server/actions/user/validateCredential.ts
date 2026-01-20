'use server'

import type { SignInCredential } from '@/@types/auth'
import { apiSignIn } from '@/services/AuthService'

const validateCredential = async (values: SignInCredential) => {
    try {
        const response = await apiSignIn(values)

        return {
            id: response.id,
            name: response.name,
            email: response.email,
            role: response.role, // 🔥 IMPORTANT
        }
    } catch {
        return null
    }
}


export default validateCredential
