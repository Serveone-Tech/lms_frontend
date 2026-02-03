'use client'

import { useEffect, useState } from 'react'
import { apiGetCurrentUser } from '@/services/userService'
import Avatar from '@/components/ui/Avatar'
import ProfileForm from './_components/ProfileForm'

const ProfilePage = () => {
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const res = await apiGetCurrentUser()
            setUser(res.user)
        }
        fetchUser()
    }, [])
    return (
        <div className="flex justify-center">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Edit Profile
                    </h2>
                    <p className="text-sm text-gray-500">
                        Update your personal information and profile photo
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    {user && (
                        <>
                            {/* Avatar section */}
                            <div className="flex items-center gap-4 mb-6">
                                <Avatar
                                    size={64}
                                    src={user.photoUrl || undefined}
                                />
                                <div>
                                    <div className="font-medium text-gray-900">
                                        {user.userName}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {user.email}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <ProfileForm
                                    initialData={{
                                        userName: user.userName,
                                        description: user.description,
                                    }}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
