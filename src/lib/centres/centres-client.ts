import { useSession } from 'next-auth/react'
import useSWR from 'swr'

import { Centre } from '@/types/centre.type'

export function useGetCentres() {
  const orgId = useSession().data?.user?.organization.id
  return useSWR<Centre[]>(`organizations/${orgId}/centres/`)
}
