'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import AdminGuard from '@/components/auth/AdminGuard/AdminGuard'
import {
    getLecturePlayerData,
    type Lecture,
} from '@/services/lecturePlayerService'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ProgressBar from './_components/ProgressBar'
import VideoPlayer from './_components/VideoPlayer'
import LectureList from './_components/LectureList'

export default function CourseLecturePage() {
    const { courseId } = useParams<{ courseId: string }>()

    const [lectures, setLectures] = useState<Lecture[]>([])
    const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null)
    const [completedLectures, setCompletedLectures] = useState<string[]>([])
    const [hasPurchased, setHasPurchased] = useState(false)
    const [progress, setProgress] = useState(0)
    const [courseTitle, setCourseTitle] = useState('')

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const res = await getLecturePlayerData(courseId)
            setLectures(res.lectures)
            setCompletedLectures(res.completedLectures)
            setHasPurchased(res.hasPurchased)
            setProgress(res.progressPercent)
            setCourseTitle(res.course.title)

            const firstPlayable = res.lectures.find(
                (l) => l.isPreviewFree || res.hasPurchased,
            )
            setCurrentLecture(firstPlayable || null)
        } catch {
            toast.push(
                <Notification type="danger" title="Error">
                    Failed to load course
                </Notification>,
            )
        }
    }

    return (
        <AdminGuard>
            <div className="max-w-7xl mx-auto px-6 py-6">
                {/* HEADER */}
                <div className="mb-4">
                    <h1 className="text-xl font-semibold text-gray-800">
                        {courseTitle}
                    </h1>
                    <ProgressBar value={progress} />
                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* VIDEO */}
                    <div className="lg:col-span-2">
                        {currentLecture ? (
                            <VideoPlayer
                                lecture={currentLecture}
                                courseId={courseId}
                                onCompleted={loadData}
                            />
                        ) : (
                            <div className="text-gray-500 text-sm">
                                No playable lecture
                            </div>
                        )}
                    </div>

                    {/* SIDEBAR */}
                    <LectureList
                        lectures={lectures}
                        completedLectures={completedLectures}
                        hasPurchased={hasPurchased}
                        currentLectureId={currentLecture?._id}
                        onSelect={(lec) => {
                            if (!lec.isPreviewFree && !hasPurchased) {
                                toast.push(
                                    <Notification type="warning" title="Locked">
                                        Purchase course to unlock
                                    </Notification>,
                                )
                                return
                            }
                            setCurrentLecture(lec)
                        }}
                    />
                </div>
            </div>
        </AdminGuard>
    )
}
