import ModuleItem from './ModuleItem'

type Props = {
    modules: any[]
    activeLecture: any
    completedLectures: string[]
    hasPurchased: boolean
    onSelectLecture: (lec: any) => void
}

export default function CurriculumSidebar({
    modules,
    activeLecture,
    completedLectures,
    hasPurchased,
    onSelectLecture,
}: Props) {
    return (
        <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold">Curriculum</h3>

            {modules.map((module: any) => (
                <ModuleItem
                    key={module._id}
                    module={module}
                    activeLecture={activeLecture}
                    completedLectures={completedLectures}
                    hasPurchased={hasPurchased}
                    onSelectLecture={onSelectLecture}
                />
            ))}
        </div>
    )
}
