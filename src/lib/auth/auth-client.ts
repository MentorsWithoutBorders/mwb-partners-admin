import { client } from '../api-client'

import { backendApiRoutes } from '@/config/backend/backend-api-routes'

// NOTE: this is just a mock function
// TODO: add types, add real implementation, etc
export async function signinUser(email: string, password: string) {
  return await client(backendApiRoutes.auth.login, {
    body: { email, password }
  })
}

export async function getUser(token?: string) {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined
  return await client(backendApiRoutes.users.user, { headers })
}

export async function signupUser(
  name: string,
  email: string,
  password: string
) {
  return await client(backendApiRoutes.auth.signup, {
    body: { name, email, password }
  })
}
