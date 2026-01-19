'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AdminGuard from '@/components/auth/AdminGuard/AdminGuard'
import {
    getCourseById,
    updateCourse,
    type Course,
} from '@/services/courseService'

export default function AdminCourseEditPage() {
    const { courseId } = useParams<{ courseId: string }>()
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState<Course | null>(null)

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [isPublished, setIsPublished] = useState(false)

    useEffect(() => {
        async function fetchCourse() {
            const res = await getCourseById(courseId)
            setCourse(res)
            setTitle(res.title)
            setCategory(res.category)
            setIsPublished(res.isPublished)
        }
        fetchCourse()
    }, [courseId])

    const handleSave = async () => {
        if (!title.trim() || !category.trim()) {
            alert('Title and category required')
            return
        }

        setLoading(true)
        await updateCourse(courseId, {
            title,
            category,
            isPublished,
        })
        setLoading(false)

        router.push('/admin/courses')
    }

    if (!course) return null

    return (
        <AdminGuard>
            <div className="max-w-3xl mx-auto mt-10">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Edit Course
                    </h1>
                    <p className="text-sm text-gray-500">
                        Update course details and publishing status
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white border border-[#8CC6CB] rounded-2xl p-6 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Course Title
                        </label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="
                                w-full rounded-lg border border-gray-300
                                px-4 py-2.5 text-sm
                                focus:outline-none
                                focus:border-[#8CC6CB]
                                focus:ring-2 focus:ring-[#E6F3F4]
                            "
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Category
                        </label>
                        <input
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            className="
                                w-full rounded-lg border border-gray-300
                                px-4 py-2.5 text-sm
                                focus:outline-none
                                focus:border-[#8CC6CB]
                                focus:ring-2 focus:ring-[#E6F3F4]
                            "
                        />
                    </div>

                    {/* Publish Toggle */}
                    <div className="flex items-center justify-between bg-[#FAF3F6] border border-[#8CC6CB] rounded-xl p-4">
                        <div>
                            <p className="text-sm font-medium text-gray-700">
                                Publish Course
                            </p>
                            <p className="text-xs text-gray-500">
                                Published courses are visible to users
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                setIsPublished((p) => !p)
                            }
                            className={`
                                relative w-14 h-7 rounded-full transition-all
                                ${
                                    isPublished
                                        ? 'bg-[#8CC6CB]'
                                        : 'bg-gray-300'
                                }
                            `}
                        >
                            <span
                                className={`
                                    absolute top-1 left-1 w-5 h-5 bg-white rounded-full
                                    transition-all
                                    ${
                                        isPublished
                                            ? 'translate-x-7'
                                            : ''
                                    }
                                `}
                            />
                        </button>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            onClick={() =>
                                router.push('/admin/courses')
                            }
                            className="
                                px-5 py-2 rounded-lg text-sm
                                border border-gray-300
                                text-gray-600
                                hover:bg-gray-100
                            "
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="
                                px-6 py-2 rounded-lg text-sm font-medium
                                bg-[#E6F3F4]
                                border border-[#8CC6CB]
                                text-[#006c74]
                                hover:bg-[#00555C]
                                disabled:opacity-60
                            "
                        >
                            {loading ? 'Saving…' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </AdminGuard>
    )
}
