'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { CommonProps } from '@/@types/common'

type SignUpFormSchema = {
    userName: string
    password: string
    email: string
    confirmPassword: string
    role?: string
    photo?: FileList
}

export type OnSignUpPayload = {
    values: SignUpFormSchema
    setSubmitting: (isSubmitting: boolean) => void
    setMessage: (message: string) => void
}

export type OnSignUp = (payload: OnSignUpPayload) => void

interface SignUpFormProps extends CommonProps {
    setMessage: (message: string) => void
    onSignUp?: OnSignUp
}

const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/

const validationSchema = z
    .object({
        email: z.email({ message: 'Please enter a valid email' }),

        userName: z.string().min(1, { message: 'Please enter your name' }),

        password: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters' })
            .regex(passwordRegex, {
                message:
                    'Password must contain uppercase, lowercase, number and special character',
            }),

        confirmPassword: z.string().min(1, {
            message: 'Confirm Password Required',
        }),

        role: z.string().optional(),
        photo: z.any().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password not match',
        path: ['confirmPassword'],
    })

const SignUpForm = (props: SignUpFormProps) => {
    const { onSignUp, className, setMessage } = props

    const [isSubmitting, setSubmitting] = useState<boolean>(false)

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<SignUpFormSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            photo: undefined,
        },
    })

    const handleSignUp = async (values: SignUpFormSchema) => {
        const formData = new FormData()
        formData.append('userName', values.userName)
        formData.append('email', values.email)
        formData.append('password', values.password)
        formData.append('role', 'user')

        if (values.photo && values.photo.length > 0) {
            formData.append('photo', values.photo[0])
        }

        if (onSignUp) {
            onSignUp({
                values: formData as any,
                setSubmitting,
                setMessage,
            })
        }
    }

    return (
        <div className={className}>
            <Form onSubmit={handleSubmit(handleSignUp)}>
                <FormItem
                    label="User name"
                    invalid={Boolean(errors.userName)}
                    errorMessage={errors.userName?.message}
                >
                    <Controller
                        name="userName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                placeholder="User Name"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Email"
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="email"
                                placeholder="Email"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Password"
                    invalid={Boolean(errors.password)}
                    errorMessage={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="password"
                                autoComplete="off"
                                placeholder="Password"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Confirm Password"
                    invalid={Boolean(errors.confirmPassword)}
                    errorMessage={errors.confirmPassword?.message}
                >
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="password"
                                autoComplete="off"
                                placeholder="Confirm Password"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem label="Profile Photo" invalid={Boolean(errors.photo)}>
                    <Controller
                        name="photo"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const files = e.target.files
                                    field.onChange(files)
                                }}
                            />
                        )}
                    />
                </FormItem>

                <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                >
                    {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </Button>
            </Form>
        </div>
    )
}

export default SignUpForm
