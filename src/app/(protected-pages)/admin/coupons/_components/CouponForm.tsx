'use client'

import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Form, FormItem } from '@/components/ui/Form'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { createCoupon, updateCoupon } from '@/services/couponService'
import type { Coupon } from '@/@types/coupon'

type Props = {
    coupon: Coupon | null
    onSuccess: () => void
}

export default function CouponForm({ coupon, onSuccess }: Props) {
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            title: '',
            description: '',
            code: '',
            discountType: 'PERCENT',
            discountValue: 0,
            minAmount: 0,
            maxDiscount: 0,
            expiresAt: '',
            usageLimit: 0,
            isActive: true,
        },
    })

    useEffect(() => {
        if (coupon) {
            reset({
                ...coupon,
                expiresAt: coupon.expiresAt
                    ? coupon.expiresAt.split('T')[0]
                    : '',
            })
        }
    }, [coupon, reset])

    const onSubmit = async (values: any) => {
        try {
            if (coupon) {
                await updateCoupon(coupon._id, values)
            } else {
                await createCoupon(values)
            }

            toast.push(
                <Notification type="success" title="Success">
                    Coupon saved successfully
                </Notification>
            )

            onSuccess()
        } catch (error) {
            toast.push(
                <Notification type="danger" title="Error">
                    Something went wrong
                </Notification>
            )
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>

            <FormItem label="Title">
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
            </FormItem>

            <FormItem label="Description">
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
            </FormItem>

            <FormItem label="Coupon Code">
                <Controller
                    name="code"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
            </FormItem>

            <FormItem label="Discount Type">
                <Controller
                    name="discountType"
                    control={control}
                    render={({ field }) => (
                        <select {...field} className="input">
                            <option value="PERCENT">Percent</option>
                            <option value="FLAT">Flat</option>
                        </select>
                    )}
                />
            </FormItem>

            <FormItem label="Discount Value">
                <Controller
                    name="discountValue"
                    control={control}
                    render={({ field }) => (
                        <Input type="number" {...field} />
                    )}
                />
            </FormItem>

            <FormItem label="Minimum Amount">
                <Controller
                    name="minAmount"
                    control={control}
                    render={({ field }) => (
                        <Input type="number" {...field} />
                    )}
                />
            </FormItem>

            <FormItem label="Max Discount (optional)">
                <Controller
                    name="maxDiscount"
                    control={control}
                    render={({ field }) => (
                        <Input type="number" {...field} />
                    )}
                />
            </FormItem>

            <FormItem label="Expiry Date">
                <Controller
                    name="expiresAt"
                    control={control}
                    render={({ field }) => (
                        <Input type="date" {...field} />
                    )}
                />
            </FormItem>

            <FormItem label="Usage Limit">
                <Controller
                    name="usageLimit"
                    control={control}
                    render={({ field }) => (
                        <Input type="number" {...field} />
                    )}
                />
            </FormItem>

            <FormItem label="Active">
                <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                        <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) =>
                                field.onChange(e.target.checked)
                            }
                        />
                    )}
                />
            </FormItem>

            <Button
                className="mt-4 rounded-lg px-4 py-2 text-sm bg-[#006c74] text-white hover:opacity-90"
                block
                variant="solid"
                type="submit"
            >
                {coupon ? 'Update Coupon' : 'Create Coupon'}
            </Button>
        </Form>
    )
}
