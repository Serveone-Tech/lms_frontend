'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import appConfig from '@/configs/app.config'

export default async function handleSignOut() {
  (await cookies()).delete('token')
  redirect(appConfig.unAuthenticatedEntryPath)
}
