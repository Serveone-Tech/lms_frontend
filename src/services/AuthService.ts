import ApiService from './ApiService'

import type {
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignUpResponse,
} from '@/@types/auth'

type VerifyOtpPayload = {
    email: string
    otp: string
}

import type { SignInCredential, SignInResponse } from '@/@types/auth'

export async function apiSignIn(data: SignInCredential) {
    return ApiService.fetchDataWithAxios<SignInResponse>({
        url: '/auth/sign-in',
        method: 'post',
        data,
    })
}

export async function apiSignUp(data: FormData) {
    return ApiService.fetchDataWithAxios<SignUpResponse>({
        url: '/auth/signup',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}


export async function apiForgotPassword<T>(data: ForgotPassword) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/auth/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword<T>(data: ResetPassword) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/auth/reset-password',
        method: 'post',
        data,
    })
}

export async function apiIssueBackendToken(data: { userId: string }) {
  return ApiService.fetchDataWithAxios({
    url: '/auth/issue-token',
    method: 'post',
    data,
  })
}

export const apiVerifyOtp = (data: VerifyOtpPayload) => {
    return ApiService.fetchDataWithAxios<{
        resetToken: string
    }>({
        url: '/auth/verify-otp',
        method: 'post',
        data,
    })
}