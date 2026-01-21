'use client'

import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import useCurrentSession from '@/utils/hooks/useCurrentSession'
import { PiUserDuotone, PiSignOutDuotone } from 'react-icons/pi'

const _UserDropdown = () => {
    const { session } = useCurrentSession()

    const avatarProps = {
        ...(session?.user?.image
            ? { src: session.user.image }
            : { icon: <PiUserDuotone /> }),
    }

    const handleLogout = async () => {
        await signOut({
            callbackUrl: '/sign-in',
        })
    }

    return (
        <Dropdown
            className="flex"
            toggleClassName="flex items-center"
            renderTitle={
                <div className="cursor-pointer flex items-center">
                    <Avatar size={32} {...avatarProps} />
                </div>
            }
            placement="bottom-end"
        >
            <Dropdown.Item variant="header">
                <div className="py-2 px-3 flex items-center gap-3">
                    <Avatar {...avatarProps} />
                    <div>
                        <div className="font-bold text-gray-900">
                            {session?.user?.name || 'Anonymous'}
                        </div>
                        <div className="text-xs">
                            {session?.user?.email || ''}
                        </div>
                    </div>
                </div>
            </Dropdown.Item>

            <Dropdown.Item variant="divider" />

            <Dropdown.Item
                eventKey="Sign Out"
                className="gap-2"
                onClick={handleLogout}
            >
                <span className="text-xl">
                    <PiSignOutDuotone />
                </span>
                <span>Sign Out</span>
            </Dropdown.Item>
        </Dropdown>
    )
}

export default withHeaderItem(_UserDropdown)
