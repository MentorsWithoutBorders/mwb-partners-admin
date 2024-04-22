import { useSession } from 'next-auth/react'
import useSWR from 'swr'

import { CenterTableEntry, Centre } from '@/types/centre.type'

export function useGetCentres() {
  const orgId = useSession().data?.user?.organization.id
  return useSWR<Centre[]>(`organizations/${orgId}/centres/`)
}

export function useGetCentresTable(searchString: string) {
  const query = new URLSearchParams({ searchString }).toString()
  return useSWR<CenterTableEntry[]>(`centers?${query}`)
}
