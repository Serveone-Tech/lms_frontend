import ApiService from '@/services/ApiService'

export type Course = {
    _id: string
    title: string
    category: string
    isPublished: boolean
}

export type CourseCategory = {
    name: string
    count: number
}

/** 🔹 Used for dashboard / browse */
export type CourseWithMeta = Course & {
    description?: string
    price?: number
    enrolledStudents?: string[]
}

export type CoursePayload = {
  title: string
  category: string
  shortDescription?: string
  price?: number
  thumbnail?: string
}


export async function createCourse(data: CoursePayload) {
    return ApiService.fetchDataWithAxios({
        url: '/course/create',
        method: 'post',
        data,
    })
}

export async function getCreatorCourses(): Promise<Course[]> {
    return ApiService.fetchDataWithAxios<Course[]>({
        url: '/course/creator',
        method: 'get',
    })
}

export async function getCourseById(courseId: string) {
    return ApiService.fetchDataWithAxios<Course>({
        url: `/course/${courseId}`,
        method: 'get',
    })
}

export async function updateCourse(
    courseId: string,
    data: { title: string; category: string; isPublished: boolean },
) {
    return ApiService.fetchDataWithAxios({
        url: `/course/${courseId}`,
        method: 'put',
        data,
    })
}

export const updateCoursePublishStatus = (
    courseId: string,
    isPublished: boolean,
) => {
    return ApiService.fetchDataWithAxios({
        url: `/course/${courseId}`,
        method: 'put',
        data: { isPublished },
    })
}

/* ======================================================
   🔽 🔽 🔽 NEW APIs (Dashboard use cases)
   ====================================================== */

/**
 * 👉 User dashboard
 * Courses which user has purchased / enrolled
 */
export async function getMyEnrolledCourses(): Promise<CourseWithMeta[]> {
    return ApiService.fetchDataWithAxios<CourseWithMeta[]>({
        url: '/course/user/my-enrolled',
        method: 'get',
    })
}

/**
 * 👉 Browse courses
 * All published courses (excluding user's enrolled)
 */
export async function getPublishedCourses(): Promise<CourseWithMeta[]> {
    return ApiService.fetchDataWithAxios<CourseWithMeta[]>({
        url: '/course/published',
        method: 'get',
    })
}

export async function getCourseCategories(): Promise<CourseCategory[]> {
    return ApiService.fetchDataWithAxios<CourseCategory[]>({
        url: '/course/categories',
        method: 'get',
    })
}