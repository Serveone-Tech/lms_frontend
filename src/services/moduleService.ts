import ApiService from '@/services/ApiService'

export const createModule = (courseId: string, title: string) => {
    return ApiService.fetchDataWithAxios({
        url: `/course/${courseId}/module`,
        method: 'post',
        data: { title },
    })
}

export const getCourseModules = (courseId: string) => {
    return ApiService.fetchDataWithAxios({
        url: `/course/${courseId}`,
        method: 'get',
    })
}