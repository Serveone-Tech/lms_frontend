'use client'

import AdminGuard from '@/components/auth/AdminGuard/AdminGuard'
import OfferBanner from './_components/OfferBanner'
import EnrolledCourses from './_components/EnrolledCourses'
import BrowseCourses from './_components/BrowseCourses'


export default function UserDashboardPage() {
    return (
        <AdminGuard>
            <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
                <OfferBanner />
                <EnrolledCourses />
                <BrowseCourses />
            </div>
        </AdminGuard>
    )
}
