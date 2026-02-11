import { Coupon } from '@/@types/coupon'
import ApiService from '@/services/ApiService'


export const getCoupons = async () => {
    return ApiService.fetchDataWithAxios<Coupon[]>({
        url: '/coupons',
        method: 'get',
    })
}

export const createCoupon = async (data: Partial<Coupon>) => {
    return ApiService.fetchDataWithAxios({
        url: '/coupons',
        method: 'post',
        data,
    })
}

export const updateCoupon = async (id: string, data: Partial<Coupon>) => {
    return ApiService.fetchDataWithAxios({
        url: `/coupons/${id}`,
        method: 'put',
        data,
    })
}

export const deleteCoupon = async (id: string) => {
    return ApiService.fetchDataWithAxios({
        url: `/coupons/${id}`,
        method: 'delete',
    })
}

export const applyCoupon = async (data: {
    code: string
    courseId: string
}) => {
    return ApiService.fetchDataWithAxios<{
        success: boolean
        price: number
        discount: number
        finalAmount: number
        coupon: {
            id: string
            title: string
            code: string
        }
    }>({
        url: '/coupons/apply',
        method: 'post',
        data,
    })
}