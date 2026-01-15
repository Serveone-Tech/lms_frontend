type Props = {
    lecture: any
    isActive: boolean
    onClick: () => void
}

export default function LectureItem({
    lecture,
    isActive,
    onClick,
}: Props) {
    const locked = !lecture.isFree

    return (
        <div
            onClick={!locked ? onClick : undefined}
            className={`
                flex justify-between items-center px-3 py-2 text-sm
                ${locked ? 'text-gray-400' : 'cursor-pointer'}
                ${isActive ? 'bg-primarySubtle' : 'hover:bg-gray-50'}
            `}
        >
            <span>{lecture.title}</span>

            {locked ? (
                <span>🔒</span>
            ) : (
                <span className="text-green-600 text-xs">Free</span>
            )}
        </div>
    )
}
