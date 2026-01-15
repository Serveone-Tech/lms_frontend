'use client'

import { useEffect, useState } from 'react'
import ApiService from '@/services/ApiService'
import CategoryFilter from './CategoryFilter'
import BrowseCourseCard from './BrowseCourseCard'

type Course = {
    _id: string
    title: string
    category: string
    price: number
    hasFreePreview: boolean
}

export default function BrowseCourses() {
    const [courses, setCourses] = useState<Course[]>([])
    const [category, setCategory] = useState<string>('all')

    useEffect(() => {
        ApiService.fetchDataWithAxios<Course[]>({
            url: '/course/published',
            method: 'get',
            params: { category },
        }).then(setCourses)
    }, [category])

    return (
        <section className="mt-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Browse Courses
                </h2>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
                {[
                    'All',
                    'Business',
                    'Design',
                    'IT',
                    'Technical',
                    'Visual Arts',
                ].map((cat) => (
                    <button
                        key={cat}
                        className="
                        px-4 py-1.5 rounded-full text-xs font-medium
                        border border-gray-300
                        text-gray-600
                        hover:border-[#B833EA]
                        hover:text-[#B833EA]
                        transition
                    "
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((course) => (
                    <BrowseCourseCard
                        key={course._id}
                        course={{
                            _id: course._id,
                            title: course.title,
                            price: course.price,
                            duration: course.duration || 'Self paced',
                            slug: course.slug,
                        }}
                    />
                ))}
            </div>
        </section>
    )
}
