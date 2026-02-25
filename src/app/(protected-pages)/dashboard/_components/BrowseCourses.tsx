'use client'

import { useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import Image from 'next/image'
import comingSoonImg from '@/assets/images/coming-soon.png'
import { getPublishedCourses } from '@/services/courseService'

export default function BrowseCourses() {
    const [courses, setCourses] = useState<any[]>([])
    const [category, setCategory] = useState('All')

    useEffect(() => {
        getPublishedCourses().then(setCourses)
    }, [])

    const filtered =
        category === 'All'
            ? courses
            : courses.filter((c) => c.category === category)

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filtered.map((course) => (
                    <CourseCard
                        key={course._id}
                        course={course}
                        variant="browse"
                    />
                ))}

                {/* Coming Soon Card */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="relative w-full h-full min-h-50">
                        <Image
                            src={comingSoonImg}
                            alt="Coming Soon"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}