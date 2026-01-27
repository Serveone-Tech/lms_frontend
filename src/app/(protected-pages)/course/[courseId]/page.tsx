import CoursePlayerLayout from '@/components/course-player/CoursePlayerLayout'

export default async function CoursePlayerPage({
    params,
}: {
    params: Promise<{ courseId: string }>
}) {
    const { courseId } = await params   // ✅ REQUIRED IN NEXT 15

    return <CoursePlayerLayout courseId={courseId} />
}
