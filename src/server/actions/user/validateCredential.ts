'use server'

import type { SignInCredential } from '@/@types/auth'
import { apiSignIn } from '@/services/AuthService'

const validateCredential = async (values: SignInCredential) => {
    try {
        const response = await apiSignIn(values)
console.log("validateCredential response",response)
        return {
            id: response._id,
            userName: response.userName,
            email: response.email,
            role: response.role,
            photoUrl: response.photoUrl,
        }
    } catch {
        return null
    }
}


export default validateCredential
