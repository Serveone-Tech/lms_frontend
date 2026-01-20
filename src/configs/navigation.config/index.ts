import { NAV_ITEM_TYPE_ITEM } from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    {
        key: 'dashboard',
        path: '/dashboard',
        title: 'Dashboard',
        translateKey: 'nav.dashboard',
        icon: 'dashboard',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['user', 'admin'],
        subMenu: [],
    },
    {
        key: 'courses',
        path: '/admin/courses',
        title: 'Courses',
        translateKey: 'nav.courses',
        icon: 'courses',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['admin'],
        subMenu: [],
    },
    {
        key: 'users',
        path: '/admin/users',
        title: 'Users',
        translateKey: 'nav.users',
        icon: 'users',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['admin'],
        subMenu: [],
    },
]

export default navigationConfig
