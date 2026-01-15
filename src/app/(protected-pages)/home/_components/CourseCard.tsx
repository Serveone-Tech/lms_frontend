import ProgressBar from './ProgressBar'
import { useRouter } from 'next/navigation'

interface Course {
    _id: string
    title: string
    category: string
    progress?: number
}

export default function CourseCard({
    course,
    variant,
}: {
    course: Course
    variant: 'enrolled' | 'browse'
}) {
    const router = useRouter()

    return (
        <div className="bg-white border rounded-2xl p-5 hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800">
                {course.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
                {course.category}
            </p>

            {variant === 'enrolled' && (
                <div className="mt-4 space-y-2">
                    <ProgressBar value={course.progress || 0} />
                    <button
                        onClick={() =>
                            router.push(`/course/${course._id}/lecture`)
                        }
                        className="w-full mt-2 rounded-lg px-4 py-2 text-sm
                        bg-[#F4E9EE] border border-[#E6C9D5]
                        text-[#7A3E55] hover:bg-[#EAD6DE]"
                    >
                        Resume
                    </button>
                </div>
            )}

            {variant === 'browse' && (
                <button
                    onClick={() =>
                        router.push(`/course/${course._id}`)
                    }
                    className="w-full mt-4 rounded-lg px-4 py-2 text-sm
                    border border-[#E6C9D5] text-[#7A3E55]
                    bg-[#F4E9EE] hover:bg-[#EAD6DE]"
                >
                    View Curriculum
                </button>
            )}
        </div>
    )
}
