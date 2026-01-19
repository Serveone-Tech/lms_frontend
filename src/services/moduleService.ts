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


export const deleteModule = (moduleId: string) =>
  ApiService.fetchDataWithAxios({
    url: `/course/module/${moduleId}`,
    method: 'delete',
  })

export const updateModule = (moduleId: string, title: string) =>
  ApiService.fetchDataWithAxios({
    url: `/course/module/${moduleId}`,
    method: 'put',
    data: { title },
  })
