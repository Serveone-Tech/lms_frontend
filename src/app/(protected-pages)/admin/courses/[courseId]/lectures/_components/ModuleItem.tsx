'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Plus } from 'lucide-react'
import { createLecture } from '@/services/lectureService'
import { deleteModule } from '@/services/moduleService'
import toast from '@/components/ui/toast'
import { Notification } from '@/components/ui'

type Props = {
    module: Module
    refresh: () => Promise<void>
}

export default function ModuleItem({ module, refresh }: Props) {
    const [open, setOpen] = useState(true)
    const [lectureTitle, setLectureTitle] = useState('')
    const [loading, setLoading] = useState(false)

    const addLecture = async () => {
        if (!lectureTitle.trim()) return
console.log('Adding lecture to module:', module);
        setLoading(true)
        await createLecture(module._id, lectureTitle)
        setLectureTitle('')
        setLoading(false)

        toast.push(
            <Notification type="success" title="Lecture Added">
                Lecture created successfully
            </Notification>
        )

        refresh()
    }

    return (
        <div className="border rounded-xl bg-white">
            {/* MODULE HEADER */}
            <div
                className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setOpen(!open)}
            >
                <div>
                    <h3 className="font-medium text-gray-800">
                        {module.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                        {module.lectures.length} lectures
                    </p>
                </div>

                {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            {/* MODULE BODY */}
            {open && (
                <div className="px-5 pb-5">
                    {/* LECTURES */}
                    <div className="space-y-2 mb-4">
                        {module.lectures.map((lec, i) => (
                            <div
                                key={lec._id}
                                className="flex justify-between text-sm px-3 py-2 rounded-md bg-gray-50"
                            >
                                <span>
                                    {i + 1}. {lec.title}
                                </span>

                                {lec.isPreviewFree && (
                                    <span className="text-xs text-green-600">
                                        Free
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* ADD LECTURE */}
                    <div className="flex gap-2">
                        <input
                            className="
                                flex-1 rounded-lg border px-3 py-2 text-sm
                                focus:ring-2 focus:ring-[#F4E9EE]
                            "
                            placeholder="New lecture title"
                            value={lectureTitle}
                            onChange={(e) =>
                                setLectureTitle(e.target.value)
                            }
                        />

                        <button
                            onClick={addLecture}
                            disabled={loading}
                            className="
                                flex items-center gap-1 px-4 py-2 text-sm
                                rounded-lg bg-[#F4E9EE] text-[#7A3E55]
                                hover:bg-[#EAD6DE]
                            "
                        >
                            <Plus size={14} />
                            Add
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
