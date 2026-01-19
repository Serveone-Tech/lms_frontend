'use client'

import { useRouter } from 'next/navigation'

type Props = {
    course: {
        _id: string
        title: string
        price: number
        duration?: string
        slug?: string
    }
}

export default function BrowseCourseCard({ course }: Props) {
    const router = useRouter()

    return (
        <div
            className="
                bg-white
                border border-[#8CC6CB]
                rounded-2xl
                p-5
                hover:shadow-md
                transition
                flex flex-col
            "
        >
            {/* Icon */}
            <div
                className="
                    w-10 h-10
                    rounded-xl
                    bg-[#E6F3F4]
                    flex items-center justify-center
                    mb-4
                "
            >
                <span className="text-[#006c74] font-semibold">
                    📘
                </span>
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
                {course.title}
            </h3>

            {/* Duration */}
            <p className="text-xs text-gray-500 mb-4">
                ⏱ {course.duration || 'Self paced'}
            </p>

            {/* Price */}
            <div className="mt-auto">
                <p className="text-base font-semibold text-gray-800 mb-3">
                    ₹{course.price}
                </p>

                <button
                    onClick={() =>
                        router.push(`/course/${course.slug || course._id}`)
                    }
                    className="
                        w-full
                        rounded-xl
                        px-4 py-2
                        text-sm font-medium
                        border border-[#B833EA]
                        text-[#B833EA]
                        hover:bg-[#E6F3F4]
                        transition
                    "
                >
                    View Curriculum
                </button>
            </div>
        </div>
    )
}
