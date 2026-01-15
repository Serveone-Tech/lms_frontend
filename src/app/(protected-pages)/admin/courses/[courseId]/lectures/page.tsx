'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import AdminGuard from '@/components/auth/AdminGuard/AdminGuard'

import { createModule, getCourseModules } from '@/services/moduleService'
import ModuleItem from './_components/ModuleItem'

export default function AdminLecturesPage() {
    const { courseId } = useParams<{ courseId: string }>()
    const [modules, setModules] = useState<Module[]>([])
    const [moduleTitle, setModuleTitle] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchModules = async () => {
        const res = await getCourseModules(courseId)
        setModules(res.modules || [])
    }

    const handleAddModule = async () => {
        if (!moduleTitle.trim()) return

        setLoading(true)
        await createModule(courseId, moduleTitle)
        setModuleTitle('')
        setLoading(false)

        fetchModules()
    }

    useEffect(() => {
        fetchModules()
    }, [])

    return (
        <AdminGuard>
            <div className="max-w-6xl mx-auto px-4 md:px-6 mt-10">
                {/* Page Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Course Modules
                    </h1>
                    <p className="text-sm text-gray-500">
                        Add and manage modules for this course
                    </p>
                </div>

                {/* Add Module Card (TOP) */}
                <div className="mb-10">
                    <div className="bg-[#FFF9FB] border border-[#E6C9D5] rounded-2xl p-6 max-w-3xl mx-auto">
                        <h2 className="text-lg font-medium text-gray-800 mb-1">
                            Add New Module
                        </h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Create a new module for this course
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
                                value={moduleTitle}
                                onChange={(e) => setModuleTitle(e.target.value)}
                            />

                            <button
                                onClick={handleAddModule}
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
                {modules.length === 0 ? (
                    <div className="text-sm text-gray-500 text-center">
                        No lectures added yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                        {modules.map((module) => (
                            <ModuleItem
                                key={module._id}
                                module={module}
                                refresh={fetchModules}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminGuard>
    )
}
