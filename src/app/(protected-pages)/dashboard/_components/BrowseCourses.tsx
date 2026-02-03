'use client'

import { useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import CategoryTabs from './CategoryTabs'
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
            <CategoryTabs
                categories={['All', ...new Set(courses.map(c => c.category))]}
                active={category}
                onChange={setCategory}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filtered.map((course) => (
                    <CourseCard
                        key={course._id}
                        course={course}
                        variant="browse"
                    />
                ))}
            </div>
        </div>
    )
}
