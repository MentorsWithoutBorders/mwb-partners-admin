import { client } from '../api-client'

import { backendApiRoutes } from '@/config/backend-api-routes'

// NOTE: this is just a mock function
// TODO: add types, add real implementation, etc
export function signinUser(email: string, password: string) {
  return client(backendApiRoutes.auth.login, { body: { email, password } })
}

export function signupUser(name: string, email: string, password: string) {
  return client(backendApiRoutes.auth.signup, {
    body: { name, email, password }
  })
}
