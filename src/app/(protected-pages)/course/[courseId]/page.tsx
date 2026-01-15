import CoursePlayerLayout from '@/components/course-player/CoursePlayerLayout'

export default function CoursePlayerPage({
    params,
}: {
    params: { courseId: string }
}) {
    return <CoursePlayerLayout courseId={params.courseId} />
}
