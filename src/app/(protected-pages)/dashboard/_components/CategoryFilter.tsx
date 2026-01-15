'use client'


const categories = [
    'All',
    'Business',
    'Design',
    'IT',
    'Technical',
    'Visual Arts',
]


export default function CategoryFilter() {
    return (
        <div className="flex flex-wrap gap-3 mt-4">
    {categories.map((cat) => (
        <button
            key={cat}
            className="
                px-4 py-1.5 rounded-full text-xs font-medium
                border
                text-gray-600
                hover:border-[#B833EA]
                hover:text-[#B833EA]
                transition
            "
        >
            {cat}
        </button>
    ))}
</div>

    )
}
