'use client'

import { useRef } from 'react'
import {
    markLectureCompleted,
    type Lecture,
} from '@/services/lecturePlayerService'

type Props = {
    lecture: Lecture
    courseId: string
    onCompleted: () => void
}

export default function VideoPlayer({
    lecture,
    courseId,
    onCompleted,
}: Props) {
    const videoRef = useRef<HTMLVideoElement>(null)

    const handleEnded = async () => {
        if (!lecture.videoUrl) return
        await markLectureCompleted(courseId, lecture._id, 0)
        onCompleted()
    }

    return (
        <div className="bg-black rounded-xl overflow-hidden">
            <video
                ref={videoRef}
                src={lecture.videoUrl}
                controls
                controlsList="nodownload"
                disablePictureInPicture
                onEnded={handleEnded}
                className="w-full h-105 object-contain"
            />
        </div>
    )
}
