'use client'

import { markLectureCompleted } from '@/services/lecturePlayerService'
import { useRef, useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import { HiPlay, HiPause } from 'react-icons/hi'

type Props = {
    lecture: any
    onCompleted: () => void
    courseId: string
    hasPurchased: boolean
}

export default function VideoPanel({
    lecture,
    onCompleted,
    courseId,
    hasPurchased,
}: Props) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    // Resume from last watched time
    useEffect(() => {
        if (videoRef.current && lecture?.lastWatchedTime) {
            videoRef.current.currentTime = lecture.lastWatchedTime
        }
    }, [lecture])

    const handleLogout = async () => {
        await signOut({
            callbackUrl: '/sign-in',
        })
    }

    // DevTools detection
    useEffect(() => {
        let loggedOut = false

        const detectDevTools = () => {
            const threshold = 160
            const opened =
                window.outerWidth - window.innerWidth > threshold ||
                window.outerHeight - window.innerHeight > threshold

            if (opened && !loggedOut) {
                loggedOut = true

                fetch('/api/auth/logout', {
                    method: 'POST',
                    credentials: 'include',
                })
                handleLogout()
                localStorage.clear()
                sessionStorage.clear()
                window.location.replace('/sign-in')
            }
        }

        const interval = setInterval(detectDevTools, 1000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handlePlay = () => setIsPlaying(true)
        const handlePause = () => setIsPlaying(false)

        video.addEventListener('play', handlePlay)
        video.addEventListener('pause', handlePause)

        return () => {
            video.removeEventListener('play', handlePlay)
            video.removeEventListener('pause', handlePause)
        }
    }, [lecture])

    if (!lecture) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-900">
                <div className="text-center">
                    <div className="text-6xl mb-4">🎥</div>
                    <p className="text-gray-400 text-lg">
                        Select a lecture to start learning
                    </p>
                </div>
            </div>
        )
    }

    if (!lecture.videoUrl) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-900">
                <div className="text-center">
                    <div className="text-6xl mb-4">📹</div>
                    <p className="text-gray-400 text-lg">
                        No video available for this lecture
                    </p>
                </div>
            </div>
        )
    }

    if (!hasPurchased && !lecture.isFree) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-900">
                <div className="text-center max-w-md px-6">
                    <div className="text-6xl mb-4">🔒</div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                        Lecture Locked
                    </h3>
                    <p className="text-gray-400">
                        Purchase this course to unlock all lectures and start
                        learning
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-black">
            {/* Video Container with 16:9 aspect ratio */}
            <div className="relative w-full max-w-full" style={{ aspectRatio: '16/9' }}>
                <video
                    ref={videoRef}
                    src={lecture.videoUrl}
                    controls
                    controlsList="nodownload"
                    disablePictureInPicture
                    className="w-full h-full"
                    onContextMenu={(e) => e.preventDefault()}
                    onEnded={async () => {
                        await markLectureCompleted(courseId, lecture._id)
                        onCompleted()
                    }}
                />
            </div>

            {/* Lecture Title Overlay */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-4">
                <h2 className="text-white text-lg font-medium drop-shadow-lg">
                    {lecture.title}
                </h2>
            </div>
        </div>
    )
}
