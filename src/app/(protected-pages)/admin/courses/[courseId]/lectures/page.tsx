'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import AdminGuard from '@/components/auth/AdminGuard/AdminGuard'
import LectureItem from './_components/LectureItem'

import { createModule, getCourseModules } from '@/services/moduleService'

export default function AdminLecturesPage() {
    const { courseId } = useParams<{ courseId: string }>()
    const [lectures, setLectures] = useState<Lecture[]>([])
    const [lectureTitle, setLectureTitle] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchLectures = async () => {
        const res = await getCourseModules(courseId)
        setLectures(res.lectures || [])
    }

    const handleAddLecture = async () => {
        if (!lectureTitle.trim()) {
            alert('Lecture title required')
            return
        }

        setLoading(true)
        await createModule(courseId, lectureTitle)
        setLectureTitle('')
        setLoading(false)

        fetchLectures()
    }

    useEffect(() => {
        fetchLectures()
    }, [])

    return (
        <AdminGuard>
            <div className="max-w-6xl mx-auto px-4 md:px-6 mt-10">
                {/* Page Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Course Lectures
                    </h1>
                    <p className="text-sm text-gray-500">
                        Add and manage lectures for this course
                    </p>
                </div>

                {/* Add Lecture Card (TOP) */}
                <div className="mb-10">
                    <div className="bg-[#FFF9FB] border border-[#E6C9D5] rounded-2xl p-6 max-w-3xl mx-auto">
                        <h2 className="text-lg font-medium text-gray-800 mb-1">
                            Add New Lecture
                        </h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Create a new lecture for this course
                        </p>

                        <div className="flex gap-3">
                            <input
                                className="
                                    flex-1 rounded-xl border border-gray-300
                                    px-4 py-3 text-sm
                                    focus:outline-none
                                    focus:border-[#E6C9D5]
                                    focus:ring-2 focus:ring-[#F4E9EE]
                                "
                                placeholder="Eg: Introduction, Setup, Basics"
                                value={lectureTitle}
                                onChange={(e) =>
                                    setLectureTitle(e.target.value)
                                }
                            />

                            <button
                                onClick={handleAddLecture}
                                disabled={loading}
                                className="
                                    rounded-xl px-6 py-3
                                    bg-[#F4E9EE]
                                    border border-[#E6C9D5]
                                    text-[#7A3E55] font-medium
                                    hover:bg-[#EAD6DE]
                                    transition
                                    disabled:opacity-60
                                "
                            >
                                {loading ? 'Adding…' : 'Add Lecture'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Lecture Grid */}
                {lectures.length === 0 ? (
                    <div className="text-sm text-gray-500 text-center">
                        No lectures added yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {lectures.map((lecture) => (
                            <LectureItem
                                key={lecture._id}
                                lecture={lecture}
                                refresh={fetchLectures}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminGuard>
    )
}
