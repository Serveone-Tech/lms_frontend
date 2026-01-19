'use client'

import { useEffect, useState } from 'react'
import { getCourseCategories } from '@/services/courseService'

type Props = {
    value: string
    onChange: (category: string) => void
}

type Category = {
    name: string
    count: number
}

export default function CategoryTabs({ value, onChange }: Props) {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCourseCategories()
            .then(setCategories)
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className="flex gap-3 flex-wrap">
                {[1, 2, 3, 4].map(i => (
                    <div
                        key={i}
                        className="h-8 w-24 rounded-full bg-gray-100 animate-pulse"
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="flex gap-3 flex-wrap">
            {categories.map(cat => {
                const isActive = value === cat.name

                return (
                    <button
                        key={cat.name}
                        onClick={() => onChange(cat.name)}
                        className={`
                            px-4 py-1 rounded-full text-sm font-medium
                            border transition-all
                            ${
                                isActive
                                    ? 'bg-[#006c74] text-white border-[#006c74]'
                                    : 'border-[#8CC6CB] text-[#006c74] bg-[#E6F3F4] hover:bg-[#00555C]'
                            }
                        `}
                    >
                        {cat.name}
                        <span className="ml-1 opacity-70">
                            ({cat.count})
                        </span>
                    </button>
                )
            })}
        </div>
    )
}
