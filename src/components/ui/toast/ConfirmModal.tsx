'use client'

type ConfirmModalProps = {
    open: boolean
    title?: string
    message: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    onCancel: () => void
}

export default function ConfirmModal({
    open,
    title = 'Are you sure?',
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {title}
                </h2>

                <p className="text-sm text-gray-600 mb-6">
                    {message}
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="
                            px-4 py-2 rounded-lg text-sm
                            border border-gray-300
                            text-gray-600
                            hover:bg-gray-100
                        "
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        className="
                            px-5 py-2 rounded-lg text-sm font-medium
                            bg-[#E6F3F4]
                            border border-[#8CC6CB]
                            text-[#006c74]
                            hover:bg-[#00555C]
                        "
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}
