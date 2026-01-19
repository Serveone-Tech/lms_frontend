'use client'

import { useState } from 'react'
import {
  uploadLectureVideo,
  deleteLecture,
  type Lecture,
} from '@/services/lectureService'
import ConfirmModal from '@/components/ui/toast/ConfirmModal'
import { Notification } from '@/components/ui'
import toast from '@/components/ui/toast'

type Props = {
  lecture: Lecture
  onUpdated: () => Promise<void>
}

export default function LectureItem({ lecture, onUpdated }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [previewFree, setPreviewFree] = useState<boolean>(lecture.isFree)
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleUpload = async () => {
    if (!file) {
      toast.push(
        <Notification type="warning" title="Warning">
          Please select a video file
        </Notification>
      )
      return
    }

    const formData = new FormData()
    formData.append('video', file)
    formData.append('isFree', previewFree ? 'true' : 'false')

    try {
      setLoading(true)
      await uploadLectureVideo(lecture._id, formData)

      toast.push(
        <Notification type="success" title="Success">
          Lecture updated successfully
        </Notification>
      )

      setFile(null)
      await onUpdated()
    } catch {
      toast.push(
        <Notification type="danger" title="Error">
          Video upload failed
        </Notification>
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
          Lecture deleted
        </Notification>
      )

      await onUpdated()
    } catch {
      toast.push(
        <Notification type="danger" title="Error">
          Delete failed
        </Notification>
      )
    } finally {
      setShowConfirm(false)
    }
  }

  return (
    <>
      <div className="mt-3 rounded-xl border p-3 bg-[#FFF9FB]">
        {/* Video preview */}
        {lecture.videoUrl && (
          <video
            src={lecture.videoUrl}
            controls
            className="w-full rounded-lg mb-3"
          />
        )}

        {/* Upload */}
        <label className="block border border-dashed rounded-lg p-3 text-xs text-center cursor-pointer mb-3">
          {file ? file.name : 'Click to upload video'}
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        {/* Preview free */}
        <label className="flex items-center gap-2 text-xs mb-3">
          <input
            type="checkbox"
            checked={previewFree}
            onChange={(e) => setPreviewFree(e.target.checked)}
          />
          Preview Free
        </label>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleUpload}
            disabled={loading}
            className="flex-1 rounded-lg px-3 py-2 text-xs bg-[#E6F3F4]"
          >
            {loading ? 'Saving…' : 'Save'}
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            className="rounded-lg px-3 py-2 text-xs border border-red-300 text-red-500"
          >
            Delete
          </button>
        </div>
      </div>

      <ConfirmModal
        open={showConfirm}
        title="Delete Lecture"
        message="This lecture will be permanently deleted."
        confirmText="Delete"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
      />
    </>
  )
}
