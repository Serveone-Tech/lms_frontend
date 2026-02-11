'use client'

import Badge from '@/components/ui/Badge'
import { Pencil, Trash2 } from 'lucide-react'

export default function CouponTable({
    coupons,
    onEdit,
    onDelete,
}: {
    coupons: any[]
    onEdit: (coupon: any) => void
    onDelete: (coupon: any) => void
}) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="">
                    <tr>
                        <th className="p-3 text-left">Title</th>
                        <th className="p-3 text-left">Code</th>
                        <th className="p-3 text-left">Discount</th>
                        <th className="p-3 text-left">Min Amount</th>
                        <th className="p-3 text-left">Expiry</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {coupons.map((c) => (
                        <tr key={c._id} className="border-t">
                            <td className="p-3">{c.title}</td>
                            <td className="p-3 font-mono">{c.code}</td>
                            <td className="p-3">
                                {c.discountType === 'PERCENT'
                                    ? `${c.discountValue}%`
                                    : `₹${c.discountValue}`}
                            </td>
                            <td className="p-3">₹{c.minAmount}</td>
                            <td className="p-3">
                                {c.expiresAt
                                    ? new Date(c.expiresAt).toLocaleDateString()
                                    : '—'}
                            </td>
                            <td className="p-3">
                                {c.isActive ? (
                                    <Badge
                                        content="Active"
                                        className="bg-green-400"
                                    />
                                ) : (
                                    <Badge
                                        content="Inactive"
                                        className="bg-red-500"
                                    />
                                )}
                            </td>

                            <td className="p-3 text-center">
                                <div className="flex justify-center gap-3">
                                    <button onClick={() => onEdit(c)}>
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(c)}
                                        className="text-red-500"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
