// TODO: Read token from somewhere
// const localStorageKey = '__bookshelf_token__'

export async function client(
  endpoint: string,
  { body, ...customConfig }: { body?: object } = {}
) {
  const backendApiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!backendApiUrl) {
    throw new Error('No backend API URL found in environment variable')
  }

  // TODO: Set token to request header
  // const token = window.localStorage.getItem(localStorageKey)
  const headers = { 'content-type': 'application/json' }
  // if (token) {
  //   headers.Authorization = `Bearer ${token}`
  // }
  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    // TODO: Set headers
    headers: {
      ...headers
      //   ...customConfig.headers
    }
  }
  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${backendApiUrl}/${endpoint}`, config)
  if (response.status === 401) {
    // TODO: Handle logout
    // logout()
    // window.location.assign(window.location)
    // return
  }
  if (response.ok) {
    return await response.json()
  } else {
    const errorMessage = await response.text()
    return Promise.reject(new Error(errorMessage))
  }
}
