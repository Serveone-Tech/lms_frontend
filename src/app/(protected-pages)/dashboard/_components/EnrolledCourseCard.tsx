'use client'

import { useRouter } from 'next/navigation'

type Props = {
    course: {
        _id: string
        title: string
        enrolledAt: string
        progress: number
        slug: string
    }
}

export default function EnrolledCourseCard({ course }: Props) {
    const router = useRouter()

    return (
        <div className="bg-white rounded-2xl border p-5 flex flex-col">
            {/* Header */}
            <div className="flex gap-3 items-start">
                <div className="h-10 w-10 rounded-lg bg-[#F4E9EE] flex items-center justify-center text-[#7A3E55] font-bold text-sm">
                    SEO
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                        {course.title}
                    </h3>
                    <p className="text-xs text-gray-400">
                        Enrolled on {course.enrolledAt}
                    </p>
                </div>
            </div>

            {/* Progress */}
            <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Course Progress</span>
                    <span>{course.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200">
                    <div
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${course.progress}%` }}
                    />
                </div>
            </div>

            {/* CTA */}
            <button
                onClick={() =>
                    router.push(`/course/${course.slug}/lecture`)
                }
                className="
                    mt-5 w-full rounded-xl py-2.5
                    bg-linear-to-r from-[#8E2DE2] to-[#B833EA]
                    text-white text-sm font-medium
                    hover:opacity-90
                "
            >
                Resume
            </button>
        </div>
    )
}
