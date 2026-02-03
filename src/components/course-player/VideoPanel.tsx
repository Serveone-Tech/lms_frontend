'use client'

import { markLectureCompleted } from '@/services/lecturePlayerService'
import { useRef, useEffect } from 'react'
import { signOut } from 'next-auth/react'

type Props = {
    lecture: any
    onCompleted: () => void
    courseId: string
}

export default function VideoPanel({ lecture, onCompleted, courseId }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null)
    console.log('Rendering VideoPanel for lecture:', lecture)
    // 🔁 Resume from last watched time (optional future)
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
                // 2️⃣ Local cleanup
                localStorage.clear()
                sessionStorage.clear()

                // 3️⃣ Redirect (no alert, no pause)
                window.location.replace('/sign-in')
            }
        }

        const interval = setInterval(detectDevTools, 1000)
        return () => clearInterval(interval)
    }, [])

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
            controlsList="nodownload"
            disablePictureInPicture
            className="w-full h-full rounded-xl bg-black"
            onContextMenu={(e) => e.preventDefault()}
            onEnded={async () => {
                await markLectureCompleted(courseId, lecture._id)
                onCompleted()
            }}
        />
    )
}
