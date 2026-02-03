import ApiService from '@/services/ApiService'

export type AdminUser = {
    _id: string
    userName: string
    email: string
    createdAt: string
    ordersCount: number
    totalPaid: number
}

export const getAdminUsers = async (): Promise<AdminUser[]> => {
    return ApiService.fetchDataWithAxios<AdminUser[]>({
        url: '/admin/users',
        method: 'get',
    })
}
