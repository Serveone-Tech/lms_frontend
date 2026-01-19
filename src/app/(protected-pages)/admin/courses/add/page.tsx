'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminGuard from '@/components/auth/AdminGuard/AdminGuard'
import { createCourse } from '@/services/courseService'

export default function AddCoursePage() {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [shortDescription, setShortDescription] = useState('')
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] = useState('')

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        if (!title || !category) {
            alert('Title and category required')
            return
        }

        try {
            setLoading(true)
            await createCourse({
                title,
                category,
                shortDescription,
                price: Number(price),
                thumbnail,
            })

            router.push('/admin/courses')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AdminGuard>
            <div className="max-w-xl mx-auto mt-12">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                        Add New Course
                    </h1>
                    <p className="text-sm text-gray-500 mb-8">
                        Create a new course to start adding lectures
                    </p>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Course Title
                            </label>
                            <input
                                className="
                                    w-full rounded-lg border border-gray-300
                                    px-4 py-2.5 text-sm
                                    focus:outline-none
                                    focus:border-[#8CC6CB]
                                    focus:ring-2 focus:ring-[#E6F3F4]
                                "
                                placeholder="e.g. Complete Web Development"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <input
                                className="
                                    w-full rounded-lg border border-gray-300
                                    px-4 py-2.5 text-sm
                                    focus:outline-none
                                    focus:border-[#8CC6CB]
                                    focus:ring-2 focus:ring-[#E6F3F4]
                                "
                                placeholder="e.g. Web Development"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Short Description
                            </label>
                            <textarea
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                                rows={3}
                                value={shortDescription}
                                onChange={(e) =>
                                    setShortDescription(e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price (₹)
                            </label>
                            <input
                                type="number"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Thumbnail URL
                            </label>
                            <input
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                                value={thumbnail}
                                onChange={(e) => setThumbnail(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-3 pt-4">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="
                                    inline-flex items-center justify-center
                                    rounded-xl
                                    bg-[#E6F3F4]
                                    border border-[#8CC6CB]
                                    px-6 py-2.5
                                    text-[#006c74] font-medium
                                    hover:bg-[#00555C]
                                    transition-all
                                    disabled:opacity-60
                                "
                            >
                                {loading ? 'Creating…' : 'Create Course'}
                            </button>

                            <button
                                onClick={() => router.push('/admin/courses')}
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminGuard>
    )
}
