import { client } from '../api-client'

export function createProjectAPI(partnerId: string, projectName: string) {
  return client(`/v1/partners/${partnerId}/projects`, {
    body: { projectName }
  })
}
