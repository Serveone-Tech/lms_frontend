import ApiService from '@/services/ApiService'

/**
 * CREATE ORDER
 * couponId & finalAmount OPTIONAL हैं
 */
export const createOrder = async (payload: {
    courseId: string
    couponId?: string
    finalAmount?: number
}) => {
    return ApiService.fetchDataWithAxios<{
        id: string
        amount: number
        currency: string
    }>({
        url: '/payment/create-order',
        method: 'post',
        data: payload,
    })
}

/**
 * VERIFY PAYMENT
 */
export const verifyPayment = async (data: {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
    courseId: string
}) => {
    return ApiService.fetchDataWithAxios({
        url: '/payment/verify-payment',
        method: 'post',
        data,
    })
}
