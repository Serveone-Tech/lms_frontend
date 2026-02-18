'use client'

import Drawer from '@/components/ui/Drawer'
import CouponForm from './CouponForm'
import type { Coupon } from '@/@types/coupon'

export default function CouponDrawer({
    open,
    coupon,
    onClose,
    onSuccess,
}: {
    open: boolean
    coupon: Coupon | null
    onClose: () => void
    onSuccess: () => void
}) {
    return (
        <Drawer
            isOpen={!!open}
            onClose={onClose}
            title={coupon ? 'Edit Coupon' : 'Create Coupon'}
            width={520}
        >
            <CouponForm
                coupon={coupon}
                onSuccess={onSuccess}
            />
        </Drawer>
    )
}
