import ProgressBar from '../ui/ProgressBar/ProgressBar'
import ModuleItem from './ModuleItem'

type Props = {
    modules: any[]
    activeLecture: any
    completedLectures: string[]
    hasPurchased: boolean
    onSelectLecture: (lec: any) => void
    progress: number
}

export default function CurriculumSidebar({
    modules,
    activeLecture,
    completedLectures,
    hasPurchased,
    onSelectLecture,
    progress,
}: Props) {
    const totalLectures = modules.reduce(
        (acc, mod) => acc + mod.lectures.length,
        0
    )

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Course Content
                </h3>
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                            {completedLectures.length} of {totalLectures}{' '}
                            lectures
                        </span>
                        <span className="font-semibold text-primary">
                            {Math.round(progress)}%
                        </span>
                    </div>
                    <ProgressBar value={progress} size="sm" color="primary" />
                </div>
            </div>

            {/* Modules List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {modules.map((module: any) => (
                    <ModuleItem
                        key={module._id}
                        module={module}
                        activeLecture={activeLecture}
                        completedLectures={completedLectures}
                        hasPurchased={hasPurchased}
                        onSelectLecture={onSelectLecture}
                    />
                ))}
            </div>
        </div>
    )
}
