'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { apiUpdateProfile } from '@/services/userService'
import { toast } from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'

type ProfileFormSchema = {
    userName: string
    description?: string
    photo?: FileList
}

const validationSchema = z.object({
    userName: z.string().min(1, { message: 'User name is required' }),
    description: z.string().optional(),
    photo: z.any().optional(),
})

type ProfileFormProps = {
    initialData?: {
        userName?: string
        description?: string
    }
}

const ProfileForm = ({ initialData }: ProfileFormProps) => {
    const router = useRouter()
    const [isSubmitting, setSubmitting] = useState(false)

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ProfileFormSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            userName: '',
            description: '',
        },
    })

    useEffect(() => {
        if (initialData) {
            reset(initialData)
        }
    }, [initialData, reset])

    const handleUpdate = async (values: ProfileFormSchema) => {
        setSubmitting(true)

        const formData = new FormData()
        formData.append('userName', values.userName)

        if (values.description) {
            formData.append('description', values.description)
        }

        if (values.photo && values.photo.length > 0) {
            formData.append('photo', values.photo[0])
        }

        try {
            await apiUpdateProfile(formData)
            toast.push(
                <Notification title="Email sent!" type="success">
                    Profile updated successfully
                </Notification>,
            )
            router.replace('/dashboard')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form onSubmit={handleSubmit(handleUpdate)} className="space-y-5">
            <FormItem
                label="User Name"
                invalid={Boolean(errors.userName)}
                errorMessage={errors.userName?.message}
            >
                <Controller
                    name="userName"
                    control={control}
                    render={({ field }) => (
                        <Input placeholder="Enter your name" {...field} />
                    )}
                />
            </FormItem>

            <FormItem label="Description (optional)">
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <Input
                            placeholder="Short bio about yourself"
                            {...field}
                        />
                    )}
                />
            </FormItem>

            <FormItem label="Profile Photo">
                <Controller
                    name="photo"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => field.onChange(e.target.files)}
                        />
                    )}
                />
            </FormItem>

            <div className="pt-2">
                <Button
                    className="
        w-full mt-4 rounded-lg px-4 py-2 text-sm
        bg-[#006c74] text-white hover:bg-[#5e2f41]
        flex items-center justify-center gap-2
    "
                    loading={isSubmitting}
                    block
                    variant="solid"
                    size="lg"
                    type="submit"
                >
                    {isSubmitting ? 'Updating Profile...' : 'Update Profile'}
                </Button>
            </div>
        </Form>
    )
}

export default ProfileForm
