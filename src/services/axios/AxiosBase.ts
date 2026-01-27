import axios from 'axios'
import AxiosResponseIntrceptorErrorCallback from './AxiosResponseIntrceptorErrorCallback'
import AxiosRequestIntrceptorConfigCallback from './AxiosRequestIntrceptorConfigCallback'
import appConfig from '@/configs/app.config'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

const AxiosBase = axios.create({
    baseURL: appConfig.apiPrefix, // e.g. http://localhost:5000/api
    timeout: 60000,
    withCredentials: true, // ✅ VERY IMPORTANT (cookie send karega)
})

AxiosBase.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        /**
         * ✅ CLIENT SIDE:
         * Cookie automatically jayegi (token)
         * No manual Authorization header required
         */

        return AxiosRequestIntrceptorConfigCallback(config)
    },
    (error) => Promise.reject(error),
)

AxiosBase.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        AxiosResponseIntrceptorErrorCallback(error)
        return Promise.reject(error)
    },
)

export default AxiosBase
