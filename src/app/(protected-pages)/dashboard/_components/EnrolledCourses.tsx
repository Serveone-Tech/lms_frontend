'use client'

import { useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import { getMyEnrolledCourses } from '@/services/courseService'

export default function EnrolledCourses() {
    const [courses, setCourses] = useState<any[]>([])

    useEffect(() => {
        getMyEnrolledCourses().then(setCourses)
    }, [])

    if (courses.length === 0) {
        return (
            <div className="bg-white rounded-xl p-6 text-gray-500">
                You haven’t enrolled in any course yet
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
                <CourseCard
                    key={course._id}
                    course={course}
                    variant="enrolled"
                />
            ))}
        </div>
    )
}
