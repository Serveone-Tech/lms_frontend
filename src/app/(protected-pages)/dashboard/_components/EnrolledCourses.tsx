'use client'

import { useEffect, useState } from 'react'
import ApiService from '@/services/ApiService'
import EnrolledCourseCard from './EnrolledCourseCard'

type EnrolledCourse = {
    _id: string
    title: string
    progress: number
    enrolledAt: string
    slug: string
}

export default function EnrolledCourses() {
    const [courses, setCourses] = useState<EnrolledCourse[]>([])

    useEffect(() => {
        ApiService.fetchDataWithAxios<EnrolledCourse[]>({
            url: '/user/enrolled-courses',
            method: 'get',
        }).then(setCourses)
    }, [])

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Enrolled Courses
            </h2>

            {courses.length === 0 ? (
                <div className="text-gray-500 text-sm">
                    You haven’t purchased any courses yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <EnrolledCourseCard key={course._id} course={course} />
                    ))}
                </div>
            )}
        </div>
    )
}
