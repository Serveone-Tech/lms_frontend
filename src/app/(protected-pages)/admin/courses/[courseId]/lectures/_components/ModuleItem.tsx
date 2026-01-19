'use client'

import { useState } from 'react'
import LectureItem from './LectureItem'
import { deleteModule } from '@/services/moduleService'
import toast from '@/components/ui/toast'
import { Notification } from '@/components/ui'
import ConfirmModal from '@/components/ui/toast/ConfirmModal'
import { createLecture } from '@/services/lectureService'

type Props = {
  module: any
  refresh: () => Promise<void>
}

export default function ModuleItem({ module, refresh }: Props) {
  const [lectureTitle, setLectureTitle] = useState('')
  const [activeLectureId, setActiveLectureId] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleAddLecture = async () => {
    if (!lectureTitle.trim()) return

    await createLecture(module._id, lectureTitle)
    setLectureTitle('')
    await refresh()
  }

  const handleDeleteModule = async () => {
    await deleteModule(module._id)
    toast.push(
      <Notification type="success" title="Deleted">
        Module deleted
      </Notification>
    )
    await refresh()
    setShowConfirm(false)
  }

  return (
    <>
      <div className="border rounded-2xl p-4 bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="font-medium">{module.title}</h3>
            <p className="text-xs text-gray-500">
              {module.lectures.length} lectures
            </p>
          </div>

          <button
            onClick={() => setShowConfirm(true)}
            className="text-xs text-red-500"
          >
            Delete
          </button>
        </div>

        {/* Lectures */}
        <div className="space-y-2">
          {module.lectures.map((lecture: any) => (
            <div key={lecture._id}>
              <div className="flex justify-between items-center px-3 py-2 rounded-lg bg-gray-50">
                <span className="text-sm">{lecture.title}</span>

                <button
                  onClick={() =>
                    setActiveLectureId(
                      activeLectureId === lecture._id
                        ? null
                        : lecture._id
                    )
                  }
                  className="text-xs text-[#006c74]"
                >
                  Edit
                </button>
              </div>

              {activeLectureId === lecture._id && (
                <LectureItem lecture={lecture} onUpdated={refresh} />
              )}
            </div>
          ))}
        </div>

        {/* Add lecture */}
        <div className="flex gap-2 mt-4">
          <input
            className="flex-1 border rounded-lg px-3 py-2 text-sm"
            placeholder="New lecture title"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
          <button
            onClick={handleAddLecture}
            className="px-4 py-2 rounded-lg bg-[#E6F3F4]"
          >
            + Add
          </button>
        </div>
      </div>

      <ConfirmModal
        open={showConfirm}
        title="Delete Module"
        message="All lectures inside this module will be deleted."
        confirmText="Delete"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDeleteModule}
      />
    </>
  )
}
