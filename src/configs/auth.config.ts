import type { NextAuthConfig } from 'next-auth'
import validateCredential from '../server/actions/user/validateCredential'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import type { SignInCredential } from '@/@types/auth'

export default {
    providers: [
        Github({
            clientId: process.env.GITHUB_AUTH_CLIENT_ID,
            clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                /** validate credentials from backend here */
                const user = await validateCredential(
                    credentials as SignInCredential,
                )
                console.log('Authorized user:', user)
                if (!user) {
                    return null
                }

                return {
                    id: user.id,
                    userName: user.userName,
                    email: user.email,
                    image: user.photoUrl,
                    role: user.role,
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                console.log('JWT callback user:', user)
                console.log('JWT callback token before:', token)
                token.userId = user.id as string
                token.role = user.role as string
                token.userName = user.userName
            }
            return token
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.userId as string // 🔥 IMPORTANT
                session.user.role = token.role as string
                session.user.userName = token.userName
                session.user.authority =
                    token.role === 'admin' ? ['ADMIN'] : ['USER']
            }
            return session
        },
    },
} satisfies NextAuthConfig
