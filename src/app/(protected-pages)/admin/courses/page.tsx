'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminGuard from '@/components/auth/AdminGuard/AdminGuard'

import AdminPageHeader from '@/components/admin/AdminPageHeader'
import AdminCard from '@/components/admin/AdminCard'
import AdminBadge from '@/components/admin/AdminBadge'
import { getCreatorCourses } from '@/services/courseService'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { updateCoursePublishStatus } from '@/services/courseService'
import ConfirmModal from '@/components/ui/toast/ConfirmModal'

type Course = {
    _id: string
    title: string
    category: string
    isPublished: boolean
}

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([])
    const [confirmCourse, setConfirmCourse] = useState<Course | null>(null)
    const [publishLoading, setPublishLoading] = useState(false)

    const router = useRouter()

    const fetchCourses = async () => {
        const data = await getCreatorCourses()
        setCourses(data)
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    const handlePublishConfirm = async () => {
        if (!confirmCourse) return

        try {
            setPublishLoading(true)

            await updateCoursePublishStatus(
                confirmCourse._id,
                !confirmCourse.isPublished,
            )

            toast.push(
                <Notification type="success" title="Updated">
                    Course{' '}
                    {confirmCourse.isPublished ? 'unpublished' : 'published'}{' '}
                    successfully
                </Notification>,
            )

            await fetchCourses()
        } catch {
            toast.push(
                <Notification type="danger" title="Error">
                    Failed to update course status
                </Notification>,
            )
        } finally {
            setPublishLoading(false)
            setConfirmCourse(null)
        }
    }

    return (
        <AdminGuard>
            <AdminPageHeader
                title="My Courses"
                action={
                    <button
                        className="
        inline-flex items-center gap-2
        rounded-xl
        bg-[#E6F3F4]
        border border-[#8CC6CB]
        px-6 py-2.5
        text-[#006c74] font-medium
        hover:bg-[#00555C]
        hover:shadow-sm
        transition-all
    "
                        onClick={() => router.push('/admin/courses/add')}
                    >
                        <span className="text-lg">＋</span>
                        Add Course
                    </button>
                }
            />

            {courses.length === 0 ? (
                <div className="mt-20 text-center text-gray-500">
                    <p className="text-lg font-medium">
                        No courses created yet
                    </p>
                    <p className="text-sm mt-1">
                        Start by creating your first course
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <AdminCard key={course._id}>
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800 leading-snug">
                                        {course.title}
                                    </h2>
                                    <AdminBadge
                                        label={
                                            course.isPublished
                                                ? 'Published'
                                                : 'Draft'
                                        }
                                        color={
                                            course.isPublished
                                                ? 'green'
                                                : 'gray'
                                        }
                                    />
                                </div>

                                {/* Meta */}
                                <p className="text-sm text-gray-500 mb-8">
                                    Category: {course.category}
                                </p>

                                {/* CTA */}
                                <div className="flex gap-2 mt-4">
                                    {/* Manage Lectures */}
                                    <button
                                        className="
            flex-1 rounded-lg px-4 py-2 text-sm
            bg-[#E6F3F4]
            border border-[#8CC6CB]
            text-[#006c74]
            hover:bg-[#00555C]
        "
                                        onClick={() =>
                                            router.push(
                                                `/admin/courses/${course._id}/lectures`,
                                            )
                                        }
                                    >
                                        Manage Lectures
                                    </button>

                                    {/* Edit Course */}
                                    <button
                                        className="
            flex-1 rounded-lg px-2 py-2 text-sm
            border border-gray-300
            text-gray-700
            hover:bg-gray-100
        "
                                        onClick={() =>
                                            router.push(
                                                `/admin/courses/${course._id}/edit`,
                                            )
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => setConfirmCourse(course)}
                                        className={`
         flex-1 rounded-lg px-4 py-2 text-sm
        border
        ${
            course.isPublished
                ? 'border-red-300 text-red-500 hover:bg-red-50'
                : 'border-[#8CC6CB] text-[#006c74] bg-[#E6F3F4] hover:bg-[#00555C]'
        }
    `}
                                    >
                                        {course.isPublished
                                            ? 'Unpublish Course'
                                            : 'Publish Course'}
                                    </button>
                                </div>
                            </div>
                        </AdminCard>
                    ))}
                    <ConfirmModal
                        open={!!confirmCourse}
                        title={
                            confirmCourse?.isPublished
                                ? 'Unpublish Course'
                                : 'Publish Course'
                        }
                        message={
                            confirmCourse?.isPublished
                                ? 'This course will be hidden from users.'
                                : 'This course will become visible to users.'
                        }
                        confirmText={
                            publishLoading
                                ? 'Please wait...'
                                : confirmCourse?.isPublished
                                  ? 'Unpublish'
                                  : 'Publish'
                        }
                        onCancel={() => setConfirmCourse(null)}
                        onConfirm={handlePublishConfirm}
                    />
                </div>
            )}
        </AdminGuard>
    )
}
