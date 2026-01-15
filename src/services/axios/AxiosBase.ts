import axios from 'axios'
import AxiosResponseIntrceptorErrorCallback from './AxiosResponseIntrceptorErrorCallback'
import AxiosRequestIntrceptorConfigCallback from './AxiosRequestIntrceptorConfigCallback'
import appConfig from '@/configs/app.config'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

// ⚠️ important: conditional import
let getServerToken: (() => string | undefined) | null = null

if (typeof window === 'undefined') {
    // server-only import (safe)
    import('next/headers').then(({ cookies }) => {
        getServerToken = () => cookies().get('token')?.value
    })
}

const AxiosBase = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefix,
    withCredentials: true,
})

AxiosBase.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        /** 🔐 SERVER SIDE TOKEN */
        if (getServerToken) {
            const token = getServerToken()
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }

        /** 🔁 EXISTING CALLBACK (DON'T REMOVE) */
        return AxiosRequestIntrceptorConfigCallback(config)
    },
    (error) => {
        return Promise.reject(error)
    },
)

AxiosBase.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        AxiosResponseIntrceptorErrorCallback(error)
        return Promise.reject(error)
    },
)

export default AxiosBase
