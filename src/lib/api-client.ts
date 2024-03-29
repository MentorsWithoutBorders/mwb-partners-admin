import { getSession, signOut } from 'next-auth/react'

export async function client(
  endpoint: string,
  { body, ...customConfig }: { body?: object; headers?: object } = {}
) {
  const backendApiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!backendApiUrl) {
    throw new Error('No backend API URL found in environment variable')
  }

  const session = await getSession()

  const headers: HeadersInit = { 'content-type': 'application/json' }
  if (session) {
    headers.Authorization = `Bearer ${session.accessToken}`
  }
  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  }
  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${backendApiUrl}/${endpoint}`, config)
  if (response.status === 401) {
    signOut()
    return
  }
  if (response.ok) return await response.json()
  try {
    const errorMessage = await response.json()
    return Promise.reject(errorMessage.message || errorMessage)
  } catch {
    return Promise.reject(await response.text())
  }
}
