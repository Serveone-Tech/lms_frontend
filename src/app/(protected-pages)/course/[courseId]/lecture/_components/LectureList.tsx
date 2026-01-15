import LectureItem from './LectureItem'
import type { Lecture } from '@/services/lecturePlayerService'

type Props = {
    lectures: Lecture[]
    completedLectures: string[]
    hasPurchased: boolean
    currentLectureId?: string
    onSelect: (lecture: Lecture) => void
}

export default function LectureList(props: Props) {
    return (
        <div className="bg-white border rounded-2xl p-4 space-y-2">
            {props.lectures.map((lecture) => (
                <LectureItem
                    key={lecture._id}
                    lecture={lecture}
                    isCompleted={props.completedLectures.includes(
                        lecture._id,
                    )}
                    locked={
                        !lecture.isPreviewFree && !props.hasPurchased
                    }
                    active={lecture._id === props.currentLectureId}
                    onClick={() => props.onSelect(lecture)}
                />
            ))}
        </div>
    )
}
