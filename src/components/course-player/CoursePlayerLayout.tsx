'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import VideoPanel from './VideoPanel'
import CurriculumSidebar from './CurriculumSidebar'
import CoursePlayerHeader from './CoursePlayerHeader'
import { getLecturePlayerData } from '@/services/lecturePlayerService'

type Props = {
    courseId: string
}

export default function CoursePlayerLayout({ courseId }: Props) {
    const router = useRouter()
    const [modules, setModules] = useState<any[]>([])
    const [activeLecture, setActiveLecture] = useState<any>(null)
    const [hasPurchased, setHasPurchased] = useState(false)
    const [completedLectures, setCompletedLectures] = useState<string[]>([])
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(true)
    const [courseTitle, setCourseTitle] = useState('')

    useEffect(() => {
        loadPlayer()
    }, [courseId])

    const loadPlayer = async () => {
        setLoading(true)

        const data = await getLecturePlayerData(courseId)

        setModules(data.modules)
        setHasPurchased(data.hasPurchased)
        setCompletedLectures(data.completedLectures)
        setProgress(data.progressPercent)
        setCourseTitle(data.courseTitle || 'Course')

        // Calculate total lectures
        const allLectures = data.modules.flatMap((m: any) => m.lectures)
        const totalLectures = allLectures.length

        // Check if all lectures are completed -> redirect to dashboard
        if (
            data.completedLectures.length === totalLectures &&
            totalLectures > 0
        ) {
            router.push('/dashboard')
            return
        }

        // Resume last lecture OR first unlocked lecture
        const lastWatched = allLectures.find((l: any) =>
            data.completedLectures.includes(l._id)
        )

        setActiveLecture(lastWatched || allLectures[0] || null)

        setLoading(false)
    }

    const handleLectureCompleted = async () => {
        await loadPlayer()
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">
                        Loading course player...
                    </p>
                </div>
            </div>
        )
    }

    const totalLectures = modules.reduce(
        (acc, mod) => acc + mod.lectures.length,
        0
    )
    const currentModuleName = modules.find((mod) =>
        mod.lectures.some((lec: any) => lec._id === activeLecture?._id)
    )?.title

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
            {/* HEADER */}
            <CoursePlayerHeader
                courseTitle={courseTitle}
                progress={progress}
                currentModule={currentModuleName}
                totalLectures={totalLectures}
                completedLectures={completedLectures.length}
            />

            {/* MAIN CONTENT */}
            <div className="flex-1 flex gap-4 p-4 overflow-hidden">
                {/* LEFT: VIDEO */}
                <div className="flex-1 bg-black rounded-xl overflow-hidden shadow-lg">
                    <VideoPanel
                        lecture={activeLecture}
                        hasPurchased={hasPurchased}
                        onCompleted={handleLectureCompleted}
                        courseId={courseId}
                    />
                </div>

                {/* RIGHT: CURRICULUM - Desktop */}
                <div className="hidden lg:block w-[380px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg">
                    <CurriculumSidebar
                        modules={modules}
                        activeLecture={activeLecture}
                        completedLectures={completedLectures}
                        hasPurchased={hasPurchased}
                        onSelectLecture={setActiveLecture}
                        progress={progress}
                    />
                </div>
            </div>

            {/* MOBILE CURRICULUM - Bottom Sheet or Modal can be added here */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {activeLecture?.title || 'Select a lecture'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {completedLectures.length}/{totalLectures} completed
                        </p>
                    </div>
                    {/* Add button to open curriculum modal on mobile */}
                </div>
            </div>
        </div>
    )
}
