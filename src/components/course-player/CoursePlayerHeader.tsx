'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui'
import { HiArrowLeft } from 'react-icons/hi'
import ProgressBar from '../ui/ProgressBar/ProgressBar'

interface CoursePlayerHeaderProps {
    courseTitle: string
    progress: number
    currentModule?: string
    totalLectures?: number
    completedLectures?: number
}

export default function CoursePlayerHeader({
    courseTitle,
    progress,
    currentModule,
    totalLectures,
    completedLectures,
}: CoursePlayerHeaderProps) {
    const router = useRouter()

    return (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between gap-4 mb-3">
                {/* LEFT: Back Button + Title */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Button
                        variant="plain"
                        size="sm"
                        icon={<HiArrowLeft />}
                        onClick={() => router.push('/dashboard')}
                        className="px-2!"
                    />
                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                            {courseTitle}
                        </h1>
                        {currentModule && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {currentModule}
                            </p>
                        )}
                    </div>
                </div>

                {/* RIGHT: Progress Stats */}
                <div className="hidden md:flex items-center gap-4 text-sm">
                    {totalLectures !== undefined &&
                        completedLectures !== undefined && (
                            <div className="text-gray-600 dark:text-gray-400">
                                <span className="font-semibold text-gray-900 dark:text-gray-100">
                                    {completedLectures}
                                </span>
                                /{totalLectures} lectures completed
                            </div>
                        )}
                    <div className="px-3 py-1.5 bg-primary bg-opacity-10 rounded-lg">
                        <span className="text-white font-semibold">
                            {Math.round(progress)}% Complete
                        </span>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <ProgressBar value={progress} size="sm" color="primary" />

            {/* Mobile Stats */}
            <div className="md:hidden mt-3 flex items-center justify-between text-sm">
                {totalLectures !== undefined &&
                    completedLectures !== undefined && (
                        <div className="text-gray-600 dark:text-gray-400">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                                {completedLectures}
                            </span>
                            /{totalLectures}
                        </div>
                    )}
                <div className="text-primary font-semibold">
                    {Math.round(progress)}%
                </div>
            </div>
        </div>
    )
}
