'use client'

import { useState } from 'react'
import LectureItem from './LectureItem'

export default function ModuleItem({
    module,
    activeLecture,
    onSelectLecture,
}: any) {
    const [open, setOpen] = useState(true)

    return (
        <div className="border rounded-lg">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center px-3 py-2 text-sm font-medium"
            >
                {module?.title}
                <span>{open ? '−' : '+'}</span>
            </button>

            {open &&
                module.lectures.map((lec: any) => (
                    <LectureItem
                        key={lec._id}
                        lecture={lec}
                        isActive={activeLecture?._id === lec._id}
                        onClick={() => onSelectLecture(lec)}
                    />
                ))}
        </div>
    )
}
