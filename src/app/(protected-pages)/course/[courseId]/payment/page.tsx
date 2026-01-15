'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AdminGuard from '@/components/auth/AdminGuard/AdminGuard'
import CourseSummaryCard from './_components/CourseSummaryCard'
import CouponCard from './_components/CouponCard'
import PaymentActions from './_components/PaymentActions'
import ApiService from '@/services/ApiService'

type Course = {
    _id: string
    title: string
    price: number
}

export default function CoursePaymentPage() {
    const { courseId } = useParams<{ courseId: string }>()
    const router = useRouter()

    const [course, setCourse] = useState<Course | null>(null)

    useEffect(() => {
        ApiService.fetchDataWithAxios<Course>({
            url: `/course/${courseId}`,
            method: 'get',
        }).then(setCourse)
    }, [])

    if (!course) return null

    return (
        <AdminGuard>
            <div className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    Complete your purchase
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <CourseSummaryCard course={course} />
                        <CouponCard />
                    </div>

                    <PaymentActions
                        course={course}
                        onSkip={() => router.push('/dashboard')}
                        onSuccess={() =>
                            router.push(
                                `/course/${courseId}/lecture`,
                            )
                        }
                    />
                </div>
            </div>
        </AdminGuard>
    )
}
