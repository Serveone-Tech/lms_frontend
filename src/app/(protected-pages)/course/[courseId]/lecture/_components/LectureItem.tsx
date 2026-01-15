import classNames from 'classnames'
import type { Lecture } from '@/services/lecturePlayerService'

type Props = {
    lecture: Lecture
    isCompleted: boolean
    locked: boolean
    active?: boolean
    onClick: () => void
}

export default function LectureItem({
    lecture,
    isCompleted,
    locked,
    active,
    onClick,
}: Props) {
    return (
        <button
            onClick={onClick}
            className={classNames(
                'w-full text-left px-3 py-2 rounded-lg flex justify-between items-center',
                active && 'bg-[#F4E9EE]',
                locked && 'opacity-60 cursor-not-allowed',
            )}
        >
            <span className="text-sm text-gray-700">
                {lecture.lectureTitle}
            </span>

            {isCompleted ? (
                <span className="text-green-500 text-xs">✓</span>
            ) : locked ? (
                <span className="text-gray-400 text-xs">🔒</span>
            ) : null}
        </button>
    )
}
