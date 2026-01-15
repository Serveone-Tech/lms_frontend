import ApiService from '@/services/ApiService'

export const createOrder = async (courseId: string) => {
    return ApiService.fetchDataWithAxios<{
        id: string
        amount: number
        currency: string
    }>({
        url: '/payment/create-order',
        method: 'post',
        data: { courseId },
    })
}

export const verifyPayment = async (data: {
    razorpay_order_id: string
    courseId: string
}) => {
    return ApiService.fetchDataWithAxios({
        url: '/payment/verify-payment',
        method: 'post',
        data,
    })
}

