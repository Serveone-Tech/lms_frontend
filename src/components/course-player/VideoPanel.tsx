type Props = {
    lecture: any
}

export default function VideoPanel({ lecture }: Props) {
    if (!lecture) {
        return (
            <div className="flex items-center justify-center h-full text-gray-400">
                Select a lecture to start learning
            </div>
        )
    }

    return (
        <video
            src={lecture.videoUrl}
            controls
            className="w-full h-full bg-black"
        />
    )
}
