'use client'

import { useState } from 'react'
import {
    uploadLectureVideo,
    deleteLecture,
    type Lecture,
} from '@/services/lectureService'
import toast from '@/components/ui/toast'
import ConfirmModal from '@/components/ui/toast/ConfirmModal'
import { Notification } from '@/components/ui'

type Props = {
    lecture: Lecture
    refresh: () => Promise<void>
}

export default function LectureItem({ lecture, refresh }: Props) {
    const [file, setFile] = useState<File | null>(null)
    const [previewFree, setPreviewFree] = useState<boolean>(
        lecture.isPreviewFree,
    )
    const [loading, setLoading] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const handleUpload = async () => {
        if (!file) {
            toast.push(
                <Notification type="warning" title="Warning">
                    Please select a video file
                </Notification>,
            )
            return
        }

        const formData = new FormData()
        formData.append('video', file)
        formData.append('isPreviewFree', previewFree ? 'true' : 'false')

        try {
            setLoading(true)
            await uploadLectureVideo(lecture._id, formData)
            toast.push(
                <Notification type="success" title="Success">
                    Lecture video updated successfully
                </Notification>,
            )

            setFile(null)
            await refresh()
        } catch (err) {
            toast.push(
                <Notification type="danger" title="Error">
                    Failed to upload video
                </Notification>,
            )
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        try {
            await deleteLecture(lecture._id)

            toast.push(
                <Notification type="success" title="Deleted">
                    Lecture deleted successfully
                </Notification>,
            )

            await refresh()
        } catch (err) {
            toast.push(
                <Notification type="danger" title="Error">
                    Failed to delete lecture
                </Notification>,
            )
        } finally {
            setShowConfirm(false)
        }
    }

    return (
        <>
            <div className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col">
                {/* Title */}
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-800">
                        {lecture.lectureTitle}
                    </h3>

                    {previewFree && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F4E9EE] text-[#7A3E55]">
                            Preview Free
                        </span>
                    )}
                </div>

                {/* Video */}
                {lecture.videoUrl && (
                    <div className="mb-3 rounded-lg overflow-hidden bg-black">
                        <video
                            src={lecture.videoUrl}
                            controls
                            className="w-full h-40 object-cover"
                        />
                    </div>
                )}

                {/* File Upload */}
                <label
                    className="
                        border border-dashed border-[#E6C9D5]
                        rounded-lg px-3 py-3 text-xs
                        text-gray-500 cursor-pointer
                        hover:bg-[#FFF9FB]
                        transition mb-3 text-center
                    "
                >
                    {file
                        ? file.name
                        : 'Click to upload video (MP4 recommended)'}
                    <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                </label>

                {/* Footer */}
                <div className="mt-auto">
                    <label className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                        <input
                            type="checkbox"
                            checked={previewFree}
                            onChange={(e) => setPreviewFree(e.target.checked)}
                        />
                        Preview Free
                    </label>

                    <div className="flex gap-2">
                        <button
                            onClick={handleUpload}
                            disabled={loading}
                            className="
                                flex-1 rounded-lg px-3 py-2 text-xs
                                bg-[#F4E9EE]
                                border border-[#E6C9D5]
                                text-[#7A3E55]
                                hover:bg-[#EAD6DE]
                                transition
                            "
                        >
                            {loading ? 'Saving…' : 'Upload / Update'}
                        </button>

                        <button
                            onClick={() => setShowConfirm(true)}
                            className="
                                rounded-lg px-3 py-2 text-xs
                                border border-red-300
                                text-red-500
                                hover:bg-red-50
                                transition
                            "
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirm Modal */}
            <ConfirmModal
                open={showConfirm}
                title="Delete Lecture"
                message="This lecture and its video will be permanently deleted."
                confirmText="Delete"
                onCancel={() => setShowConfirm(false)}
                onConfirm={handleDelete}
            />
        </>
    )
}
