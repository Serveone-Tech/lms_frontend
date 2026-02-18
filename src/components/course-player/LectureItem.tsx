'use client'

import { Badge } from '@/components/ui'
import { HiCheckCircle, HiLockClosed, HiPlay } from 'react-icons/hi'

type Props = {
    lecture: any
    isActive: boolean
    isLocked: boolean
    isCompleted: boolean
    onClick: () => void
}

export default function LectureItem({
    lecture,
    isActive,
    isLocked,
    isCompleted,
    onClick,
}: Props) {
    return (
        <div
            onClick={!isLocked ? onClick : undefined}
            className={`
                flex items-center justify-between px-4 py-3 text-sm
                transition-all duration-200
                ${
                    isLocked
                        ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60'
                        : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750'
                }
                ${
                    isActive
                        ? 'bg-opacity-10 dark:bg-primary dark:bg-opacity-20 border-l-4 border-primary'
                        : ''
                }
            `}
        >
            {/* LEFT */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* STATUS ICON */}
                <div className="shrink-0">
                    {isCompleted ? (
                        <HiCheckCircle className="w-5 h-5 text-primary" />
                    ) : isLocked ? (
                        <HiLockClosed className="w-5 h-5 text-gray-400" />
                    ) : isActive ? (
                        <HiPlay className="w-5 h-5 text-primary" />
                    ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                    )}
                </div>

                {/* TITLE */}
                <span
                    className={`truncate ${
                        isActive
                            ? 'font-medium text-primary'
                            : 'text-gray-700 dark:text-gray-300'
                    }`}
                >
                    {lecture.title}
                </span>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2 shrink-0 ml-2">
                {!isLocked && lecture.isFree && (
                    <Badge
                        content="Free"
                        className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        innerClass="!bg-transparent !text-inherit"
                    />
                )}
                {lecture.duration && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {lecture.duration}
                    </span>
                )}
            </div>
        </div>
    )
}
