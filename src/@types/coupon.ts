export type Coupon = {
    _id: string
    code: string
    discountType: 'PERCENT' | 'FLAT'
    discountValue: number
    minAmount: number
    maxDiscount?: number
    usageLimit?: number
    usedCount: number
    isActive: boolean
    expiresAt?: string
    createdAt: string
}
