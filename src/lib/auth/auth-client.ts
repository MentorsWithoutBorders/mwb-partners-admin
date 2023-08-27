import { signIn } from 'next-auth/react'
import useSWRMutation from 'swr/mutation'

import { client } from '../api-client'

import { backendApiRoutes } from '@/config/backend/backend-api-routes'

export async function signinUser(email: string, password: string) {
  return await client(backendApiRoutes.auth.login, {
    body: { email, password }
  })
}

async function signin(
  _url: string,
  { arg: { email, password } }: { arg: { email: string; password: string } }
) {
  const test = await signIn('credentials', {
    email: email,
    password: password,
    redirect: false
  })

  if (test && test.error) {
    const error: { message: string } = JSON.parse(test.error)
    throw error.message
  }

  return test
}

export function useSigninUser() {
  const { data, error, trigger, reset, isMutating } = useSWRMutation(
    backendApiRoutes.auth.login,
    signin
  )

  return {
    data,
    error,
    trigger,
    reset,
    isMutating
  }
}

export async function getUser(token?: string) {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined
  return await client(backendApiRoutes.users.user, { headers })
}

async function signupUser(
  _url: string,
  {
    arg: { name, email, password }
  }: { arg: { name: string; email: string; password: string } }
) {
  const timeZoneAbbreviation = new Date()
    .toLocaleTimeString('en-us', { timeZoneName: 'short' })
    .split(' ')[2]
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions()
  const timeZoneOffset = new Date().getTimezoneOffset()

  return await client(backendApiRoutes.auth.signup, {
    body: {
      name,
      email,
      password,
      timeZone: {
        abbreviation: timeZoneAbbreviation,
        name: timeZone,
        offset: timeZoneOffset
      }
    }
  })
}

export function useSignupUser() {
  const { data, error, trigger, reset, isMutating } = useSWRMutation(
    backendApiRoutes.auth.signup,
    signupUser
  )

  return {
    data,
    error,
    trigger,
    reset,
    isMutating
  }
}
