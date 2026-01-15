import ModuleItem from './ModuleItem'

type Props = {
    course: any
    activeLecture: any
    onSelectLecture: (lec: any) => void
}

export default function CurriculumSidebar({
    course,
    activeLecture,
    onSelectLecture,
}: Props) {
    return (
        <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold">
                {course.title}
            </h3>

            <p className="text-sm text-gray-500">
                {course.category}
            </p>

            {course.modules.map((module: any) => (
                <ModuleItem
                    key={module._id}
                    module={module}
                    activeLecture={activeLecture}
                    onSelectLecture={onSelectLecture}
                />
            ))}
        </div>
    )
}
