'use client'

import { useState } from 'react'
import { applyCoupon } from '@/services/couponService'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'

type Props = {
    courseId: string
    originalPrice: number
    onApplied: (data: {
        finalAmount: number
        discount: number
        couponCode: string
    }) => void
}

export default function CouponCard({
    courseId,
    originalPrice,
    onApplied,
}: Props) {
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [applied, setApplied] = useState(false)
    const [discount, setDiscount] = useState(0)
    const [finalPrice, setFinalPrice] = useState(originalPrice)

    const handleApply = async () => {
        if (!code.trim()) {
            toast.push(
                <Notification type="danger" title="Error">
                    Please enter coupon code
                </Notification>
            )
            return
        }

        try {
            setLoading(true)

            const res = await applyCoupon({
                code,
                courseId,
            })

            setApplied(true)
            setDiscount(res.discount)
            setFinalPrice(res.finalAmount)

            onApplied({
                finalAmount: res.finalAmount,
                discount: res.discount,
                couponCode: res.coupon.code,
            })

            toast.push(
                <Notification type="success" title="Coupon Applied">
                    You saved ₹{res.discount}
                </Notification>
            )
        } catch (error: any) {
            toast.push(
                <Notification type="danger" title="Invalid Coupon">
                    {error?.response?.data?.message || 'Failed to apply coupon'}
                </Notification>
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white border rounded-2xl p-6 mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
                Have a coupon?
            </h3>

            <div className="flex gap-2">
                <input
                    className="flex-1 rounded-lg border px-3 py-2 text-sm"
                    placeholder="Enter coupon code"
                    value={code}
                    disabled={applied}
                    onChange={(e) =>
                        setCode(e.target.value.toUpperCase())
                    }
                />

                <button
                    onClick={handleApply}
                    disabled={loading || applied}
                    className="rounded-lg px-4 py-2 text-sm
                        bg-[#E6F3F4]
                        border border-[#8CC6CB]
                        text-[#006c74]
                        disabled:opacity-50"
                >
                    {loading ? 'Applying...' : applied ? 'Applied' : 'Apply'}
                </button>
            </div>

            {applied && (
                <div className="mt-3 text-sm text-green-600">
                    Discount: ₹{discount} <br />
                    Final Price: ₹{finalPrice}
                </div>
            )}
        </div>
    )
}
