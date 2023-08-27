import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string
    refreshToken?: string
    user?: User
  }

  interface User {
    accessToken: string
    refreshToken: string
    id: string
    name: string
    email: string
    phoneNumber: string | null
    organization: {
      id: string
      name: string
    }
    isMentor: boolean
    isAdmin: boolean | null
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    refreshToken?: string
    accessToken: string
    user?: User
  }
}
