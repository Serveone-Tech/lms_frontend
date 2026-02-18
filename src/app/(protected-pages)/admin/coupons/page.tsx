'use client'

import { useEffect, useMemo, useState } from 'react'
import AdminGuard from '@/components/auth/AdminGuard/AdminGuard'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'

import { getCoupons, deleteCoupon } from '@/services/couponService'
import type { Coupon } from '@/@types/coupon'
import CouponTable from './_components/CouponTable'
import CouponDrawer from './_components/CouponDrawer'
import ConfirmModal from '@/components/ui/toast/ConfirmModal'

export default function AdminCouponsPage() {
    const [coupons, setCoupons] = useState<Coupon[]>([])
    const [search, setSearch] = useState('')
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [editCoupon, setEditCoupon] = useState<Coupon | null>(null)
    const [deleteTarget, setDeleteTarget] = useState<Coupon | null>(null)

    const loadCoupons = async () => {
        const res = await getCoupons()
        setCoupons(res)
    }

    useEffect(() => {
        loadCoupons()
    }, [])

    const filteredCoupons = useMemo(() => {
        const q = search.toLowerCase()
        return coupons.filter((c) => c.code.toLowerCase().includes(q))
    }, [coupons, search])

    const handleDelete = async () => {
        if (!deleteTarget) return

        await deleteCoupon(deleteTarget._id)
        toast.push(
            <Notification type="success" title="Deleted">
                Coupon deleted successfully
            </Notification>,
        )

        setDeleteTarget(null)
        loadCoupons()
    }

    return (
        <AdminGuard>
            <AdminPageHeader
                title="Coupons"
                action={
                    <Button
                        variant="solid"
                        onClick={() => {
                            setEditCoupon(null)
                            setDrawerOpen(true)
                        }}
                    >
                        Create Coupon
                    </Button>
                }
            />

            <div className="mb-6 max-w-sm">
                <Input
                    placeholder="Search coupon code"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <CouponTable
                coupons={filteredCoupons}
                onEdit={(c) => {
                    setEditCoupon(c)
                    setDrawerOpen(true)
                }}
                onDelete={(c) => setDeleteTarget(c)}
            />

            <CouponDrawer
                open={drawerOpen}
                coupon={editCoupon}
                onClose={() => setDrawerOpen(false)}
                onSuccess={() => {
                    setDrawerOpen(false)
                    loadCoupons()
                }}
            />

            <ConfirmModal
                open={!!deleteTarget}
                title="Delete Coupon"
                message="This coupon will be permanently deleted."
                confirmText="Delete"
                onCancel={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
            />
        </AdminGuard>
    )
}
