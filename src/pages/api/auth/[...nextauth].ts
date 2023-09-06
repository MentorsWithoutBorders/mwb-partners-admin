import NextAuth, { AuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { getUser, signinUser } from '@/lib/auth/auth-client'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        if (!credentials) return null

        const { email, password } = credentials

        const res = await signinUser(email, password).catch((error) => {
          throw error
        })

        const userFromBackend = await getUser(res.accessToken)

        const user: User = {
          id: res.userId,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          name: userFromBackend.name,
          email: userFromBackend.email,
          phoneNumber: userFromBackend.phoneNumber,
          organization: userFromBackend.organization,
          isMentor: userFromBackend.isMentor,
          isAdmin: userFromBackend.isAdmin
        }

        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { accessToken, refreshToken, ...restUser } = user

        token.accessToken = accessToken
        token.refreshToken = refreshToken
        token.user = restUser
      }

      // TODO: check if token is expired and refresh it

      return token
    },
    async session({ session, token }) {
      session.user = token.user
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      return session
    }
  }
}

export default NextAuth(authOptions)
