'use client'

import { useState } from 'react'
import LectureItem from './LectureItem'
import toast from '@/components/ui/toast'
import { Notification } from '@/components/ui'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

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

    const completedCount = module.lectures.filter((lec: any) =>
        completedLectures.includes(lec._id)
    ).length

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
            {/* MODULE HEADER */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-3 text-left
                    bg-gray-50 dark:bg-gray-750 hover:bg-gray-100 dark:hover:bg-gray-700
                    transition-colors duration-200"
            >
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                        {module.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {completedCount}/{module.lectures.length} lectures
                    </p>
                </div>
                <div className="ml-3 text-gray-500 dark:text-gray-400">
                    {open ? (
                        <HiChevronUp className="w-5 h-5" />
                    ) : (
                        <HiChevronDown className="w-5 h-5" />
                    )}
                </div>
            </button>

            {/* LECTURES */}
            {open && (
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
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
