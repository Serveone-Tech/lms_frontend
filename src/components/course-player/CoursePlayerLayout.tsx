'use client'

import { useEffect, useState } from 'react'
import { getCourseById } from '@/services/courseService'
import VideoPanel from './VideoPanel'
import CurriculumSidebar from './CurriculumSidebar'

type Props = {
    courseId: string
}

export default function CoursePlayerLayout({ courseId }: Props) {
    const [course, setCourse] = useState<any>(null)
    const [activeLecture, setActiveLecture] = useState<any>(null)

    useEffect(() => {
        getCourseById(courseId).then(setCourse)
    }, [courseId])

    if (!course) return <div className="p-6">Loading...</div>

    return (
        <div className="flex h-[calc(100vh-64px)] gap-4 px-6 py-4">
            {/* LEFT */}
            <div className="flex-1 bg-black rounded-xl overflow-hidden">
                <VideoPanel lecture={activeLecture} />
            </div>

            {/* RIGHT */}
            <div className="w-[360px] bg-white border rounded-xl overflow-y-auto">
                <CurriculumSidebar
                    course={course}
                    activeLecture={activeLecture}
                    onSelectLecture={setActiveLecture}
                />
            </div>
        </div>
    )
}
