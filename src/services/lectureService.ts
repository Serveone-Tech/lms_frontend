import ApiService from '@/services/ApiService'

export type Lecture = {
    _id: string
    lectureTitle: string
    isFree: boolean
    videoUrl?: string
}

export const getLectures = async (courseId: string) => {
    return ApiService.fetchDataWithAxios<{ lectures: Lecture[] }>({
        url: `/course/lecture/${courseId}`,
        method: 'get',
    })
}

export const createLecture = async (
    moduleId: string,
    lectureTitle: string
) => {
    return ApiService.fetchDataWithAxios({
        url: `/course/lecture/${moduleId}`,
        method: 'post',
        data: { lectureTitle },
    })
}

export const uploadLectureVideo = async (
    lectureId: string,
    formData: FormData
) => {
    return ApiService.fetchDataWithAxios({
        url: `/course/lecture/${lectureId}`,
        method: 'put',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const deleteLecture = async (lectureId: string) => {
    return ApiService.fetchDataWithAxios({
        url: `/course/lecture/${lectureId}`,
        method: 'delete',
    })
}
