type Props = {
    course: {
        title: string
        price: number
    }
}

export default function CourseSummaryCard({ course }: Props) {
    return (
        <div className="bg-white border rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-800">
                {course.title}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
                Full lifetime access
            </p>

            <div className="mt-4 flex items-center gap-3">
                <span className="text-2xl font-bold text-[#7A3E55]">
                    ₹{course.price}
                </span>
                <span className="text-sm text-gray-400 line-through">
                    ₹{course.price + 1000}
                </span>
                <span className="text-xs bg-[#F4E9EE] px-2 py-0.5 rounded-full text-[#7A3E55]">
                    Limited offer
                </span>
            </div>
        </div>
    )
}
