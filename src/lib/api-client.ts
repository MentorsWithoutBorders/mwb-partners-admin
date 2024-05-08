import { getSession, signOut } from 'next-auth/react'

function isServer() {
  return typeof window === 'undefined'
}

export async function client(
  endpoint: string,
  {
    body,
    accessToken,
    query,
    ...customConfig
  }: {
    body?: object
    accessToken?: string
    headers?: object
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
    query?: Record<string, string>
  } = {}
) {
  const backendApiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!backendApiUrl) {
    throw new Error('No backend API URL found in environment variable')
  }

  const session = await getSession()
  const headers: HeadersInit = { 'content-type': 'application/json' }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  } else if (session) {
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

  let url = `${backendApiUrl}/${endpoint}`

  if (query) {
    url += '?' + new URLSearchParams(query).toString()
  }

  new URLSearchParams(query)
  const response = await fetch(url, config)
  if (response.status === 401 && !isServer()) {
    signOut()
    return
  }

  const responseClone = response.clone()

  if (response.ok) {
    try {
      return await response.json()
    } catch (e) {
      return await responseClone.text()
    }
  }

  try {
    const errorMessage = await response.json()
    return Promise.reject(errorMessage.message || errorMessage)
  } catch {
    return Promise.reject(await responseClone.text())
  }
}
