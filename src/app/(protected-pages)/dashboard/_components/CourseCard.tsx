import ProgressBar from './ProgressBar'
import { useRouter } from 'next/navigation'

interface Course {
    _id: string
    title: string
    category: string
    price: number
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

            <p className="text-sm text-gray-500 mt-1">{course.category}</p>

            {variant === 'enrolled' && (
                <div className="mt-4 space-y-2">
                    <ProgressBar value={course.progress || 0} />
                    <button
                        onClick={() =>
                            router.push(`/course/${course._id}/lecture`)
                        }
                        className="w-full mt-2 rounded-lg px-4 py-2 text-sm
                        bg-[#E6F3F4] border border-[#8CC6CB]
                        text-[#006c74] hover:bg-[#00555C]"
                    >
                        Resume
                    </button>
                </div>
            )}

            {variant === 'browse' && (
                <>
                    <button
                        onClick={() => router.push(`/course/${course._id}`)}
                        className="w-full mt-4 rounded-lg px-4 py-2 text-sm
                    border border-[#8CC6CB] text-white
                    bg-[#006c74] hover:bg-[#00555C]"
                    >
                        View Curriculum
                    </button>
                    <button
                        onClick={() =>
                            router.push(`/course/${course._id}/payment`)
                        }
                        className="
        w-full mt-4 rounded-lg px-4 py-2 text-sm
        bg-[#006c74] text-white hover:bg-[#5e2f41]
        flex items-center justify-center gap-2
    "
                    >
                        <span>Buy Now</span>
                        <span className="font-semibold">₹{course.price}</span>
                    </button>
                </>
            )}
        </div>
    )
}
