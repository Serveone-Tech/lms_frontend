'use client'

import { useState } from 'react'
import LectureItem from './LectureItem'
import toast from '@/components/ui/toast'
import { Notification } from '@/components/ui'

type Props = {
    module: any
    activeLecture: any
    completedLectures: string[]
    hasPurchased: boolean
    onSelectLecture: (lec: any) => void
}

export default function ModuleItem({
    module,
    activeLecture,
    completedLectures,
    hasPurchased,
    onSelectLecture,
}: Props) {
    const [open, setOpen] = useState(true)

    const handleLectureClick = (lecture: any) => {
        const locked = !hasPurchased && !lecture.isFree

        if (locked) {
            toast.push(
                <Notification type="warning" title="Locked">
                    Please purchase this course to unlock this lecture
                </Notification>
            )
            return
        }

        onSelectLecture(lecture)
    }

    return (
        <div className="border rounded-xl overflow-hidden">
            {/* MODULE HEADER */}
            <button
                onClick={() => setOpen(!open)}
                className="
                    w-full flex justify-between items-center
                    px-4 py-2 text-sm font-medium
                    bg-[#f0fafa]
                    hover:bg-[#e0f2f3]
                "
            >
                <span>{module.title}</span>
                <span className="text-lg">{open ? '−' : '+'}</span>
            </button>

            {/* LECTURES */}
            {open && (
                <div className="divide-y">
                    {module.lectures.map((lec: any) => {
                        const isActive = activeLecture?._id === lec._id
                        const isCompleted = completedLectures.includes(lec._id)
                        const isLocked = !hasPurchased && !lec.isFree

                        return (
                            <LectureItem
                                key={lec._id}
                                lecture={lec}
                                isActive={isActive}
                                isCompleted={isCompleted}
                                isLocked={isLocked}
                                onClick={() => handleLectureClick(lec)}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}
