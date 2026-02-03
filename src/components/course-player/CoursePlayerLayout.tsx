'use client'

import { useEffect, useState } from 'react'
import VideoPanel from './VideoPanel'
import CurriculumSidebar from './CurriculumSidebar'
import { getLecturePlayerData } from '@/services/lecturePlayerService'

type Props = {
    courseId: string
}

export default function CoursePlayerLayout({ courseId }: Props) {
    const [modules, setModules] = useState<any[]>([])
    const [activeLecture, setActiveLecture] = useState<any>(null)
    const [hasPurchased, setHasPurchased] = useState(false)
    const [completedLectures, setCompletedLectures] = useState<string[]>([])
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(true)

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

        // ▶️ Resume last lecture OR first unlocked lecture
        const allLectures = data.modules.flatMap((m: any) => m.lectures)

        const lastWatched = allLectures.find((l: any) =>
            data.completedLectures.includes(l._id)
        )

        setActiveLecture(lastWatched || allLectures[0] || null)

        setLoading(false)
    }

    if (loading) {
        return <div className="p-6">Loading course player…</div>
    }

    return (
        <div className="flex h-[calc(100vh-64px)] gap-4 px-6 py-4">
            {/* LEFT: VIDEO */}
            <div className="flex-1 bg-black rounded-xl overflow-hidden">
                <VideoPanel
                    lecture={activeLecture}
                    hasPurchased={hasPurchased}
                    onCompleted={loadPlayer}
                    courseId={courseId}
                />
            </div>

            {/* RIGHT: CURRICULUM */}
            <div className="w-[380px] bg-white border rounded-xl overflow-y-auto">
                <CurriculumSidebar
                    modules={modules}
                    activeLecture={activeLecture}
                    completedLectures={completedLectures}
                    hasPurchased={hasPurchased}
                    onSelectLecture={setActiveLecture}
                />
            </div>
        </div>
    )
}
