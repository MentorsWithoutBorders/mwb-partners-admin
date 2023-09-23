import { client } from '../api-client'

export function getCentresList(orgId: string | number) {
  return client(`organizations/${orgId}/centres/`)
}
