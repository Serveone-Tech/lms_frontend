import ApiService from '@/services/ApiService'

export type Lecture = {
    _id: string
    lectureTitle: string
    videoUrl?: string
    isFree: boolean
    duration?: number
}

export type LecturePlayerResponse = {
    course: {
        _id: string
        title: string
    }
    lectures: Lecture[]
    hasPurchased: boolean
    completedLectures: string[]
    progressPercent: number
}

export const getLecturePlayerData = async (courseId: string) => {
    return ApiService.fetchDataWithAxios<LecturePlayerResponse>({
        url: `/course/${courseId}/lecture-player`,
        method: 'get',
    })
}

export const markLectureCompleted = async (
    courseId: string,
    lectureId: string,
    watchedSeconds: number,
) => {
    return ApiService.fetchDataWithAxios({
        url: '/progress/lecture-complete',
        method: 'post',
        data: {
            courseId,
            lectureId,
            watchedSeconds,
        },
    })
}
