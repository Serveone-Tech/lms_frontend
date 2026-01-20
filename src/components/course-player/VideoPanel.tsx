'use client'

import { markLectureCompleted } from '@/services/lecturePlayerService'
import { useRef, useEffect } from 'react'

type Props = {
    lecture: any
    onCompleted: () => void
}

export default function VideoPanel({ lecture, onCompleted }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null)

    // 🔁 Resume from last watched time (optional future)
    useEffect(() => {
        if (videoRef.current && lecture?.lastWatchedTime) {
            videoRef.current.currentTime = lecture.lastWatchedTime
        }
    }, [lecture])

    if (!lecture?.videoUrl) {
        return (
            <div className="flex items-center justify-center h-full text-sm text-gray-400">
                No video uploaded
            </div>
        )
    }

    return (
        <video
            ref={videoRef}
            src={lecture.videoUrl}
            controls
            className="w-full h-full rounded-xl bg-black"
            onEnded={async () => {
                await markLectureCompleted(lecture._id)
                onCompleted() // 🔥 refresh player data
            }}
        />
    )
}
