'use client'

import { createOrder, verifyPayment } from '@/services/paymentService'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'

type Props = {
    course: {
        _id: string
        price: number
    }
    onSkip: () => void
    onSuccess: () => void
}

declare global {
    interface Window {
        Razorpay: new (options: Record<string, unknown>) => {
            open: () => void
        }
    }
}

export default function PaymentActions({ course, onSkip, onSuccess }: Props) {
    const handlePay = async () => {
        try {
            const order = await createOrder(course._id)

            const rzp = new (window as any).Razorpay({
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
                amount: order.amount,
                currency: order.currency,
                order_id: order.id,
                handler: async (response: any) => {
                    await verifyPayment({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        courseId: course._id,
                    })

                    toast.push(
                        <Notification type="success" title="Success">
                            Course unlocked successfully
                        </Notification>,
                    )

                    // ✅ REDIRECT TO PLAYER
                    router.replace(`/course/${course._id}/lecture`)
                },
            })

            rzp.open()
        } catch (error) {
            toast.push(
                <Notification type="danger" title="Error">
                    Payment failed
                </Notification>,
            )
        }
    }

    return (
        <div className="bg-white border rounded-2xl p-6 h-fit">
            <button
                onClick={handlePay}
                className="
                    w-full rounded-xl px-4 py-3 text-sm font-medium
                    bg-[#006c74] text-white
                    hover:opacity-90
                "
            >
                Pay ₹{course.price}
            </button>

            <button
                onClick={onSkip}
                className="
                    w-full mt-3 rounded-xl px-4 py-2 text-sm
                    border border-gray-300
                    text-gray-600 hover:bg-gray-100
                "
            >
                Skip for now
            </button>

            <p className="text-xs text-gray-400 mt-3 text-center">
                You can purchase later from dashboard
            </p>
        </div>
    )
}
