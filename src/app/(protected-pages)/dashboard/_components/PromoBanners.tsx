'use client'

import { useEffect, useState } from 'react'
import { getCoupons } from '@/services/couponService'

export default function PromoBanners() {
    const [coupons, setCoupons] = useState<any[]>([])
    const [copiedCode, setCopiedCode] = useState<string | null>(null)

    useEffect(() => {
        const loadCoupons = async () => {
            const data = await getCoupons()

            const now = new Date()

            const activeCoupons = data.filter((c: any) => {
                const notExpired =
                    !c.expiresAt || new Date(c.expiresAt) > now

                const usageAvailable =
                    !c.usageLimit || c.usedCount < c.usageLimit

                return c.isActive && notExpired && usageAvailable
            })

            setCoupons(activeCoupons)
        }

        loadCoupons()
    }, [])

    if (!coupons.length) return null

    const handleCopy = async (code: string) => {
        await navigator.clipboard.writeText(code)
        setCopiedCode(code)
        setTimeout(() => setCopiedCode(null), 2000)
    }

    return (
        <div className="flex flex-col gap-4">
            {coupons.map((coupon) => (
                <div
                    key={coupon._id}
                    className="w-full rounded-2xl border border-[#8CC6CB] bg-[#E6F3F4] px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                    <div>
                        <h2 className="text-lg font-semibold text-[#006c74]">
                            🎉 {coupon.title}
                        </h2>
                        <p className="text-sm text-[#006c74]/80 mt-1">
                            {coupon.description}
                        </p>
                    </div>

                    <div className="relative group">
                        <div
                            onClick={() => handleCopy(coupon.code)}
                            className="px-5 py-2 rounded-lg border border-[#006c74] text-[#006c74] text-sm font-medium bg-white cursor-pointer hover:bg-[#006c74] hover:text-white transition"
                        >
                            {coupon.code}
                        </div>

                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                            {copiedCode === coupon.code
                                ? 'Copied!'
                                : 'Click to copy'}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
