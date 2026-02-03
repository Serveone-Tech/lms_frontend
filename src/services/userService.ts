 import ApiService from './ApiService'

export const apiGetCurrentUser = () => {
    return ApiService.fetchDataWithAxios({
        url: '/user/currentuser',
        method: 'get',
    })
}

export const apiUpdateProfile = (data: FormData) => {
    return ApiService.fetchDataWithAxios({
        url: '/user/updateprofile',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}
