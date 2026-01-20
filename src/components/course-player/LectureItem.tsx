'use client'

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
                flex justify-between items-center px-4 py-2 text-sm
                transition
                ${
                    isLocked
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'cursor-pointer hover:bg-[#e6f3f4]'
                }
                ${
                    isActive
                        ? 'bg-[#d6eff1] text-[#006c74] font-medium'
                        : ''
                }
            `}
        >
            {/* LEFT */}
            <div className="flex items-center gap-2">
                {/* STATUS ICON */}
                {isCompleted ? (
                    <span className="text-green-600">✔</span>
                ) : isLocked ? (
                    <span>🔒</span>
                ) : (
                    <span className="text-[#006c74]">▶</span>
                )}

                <span>{lecture.title}</span>
            </div>

            {/* RIGHT */}
            {!isLocked && lecture.isFree && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e0f2f3] text-[#006c74]">
                    Free
                </span>
            )}
        </div>
    )
}
