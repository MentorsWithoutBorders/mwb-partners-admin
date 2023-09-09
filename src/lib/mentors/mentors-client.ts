import { useSession } from 'next-auth/react'
import useSWR from 'swr'

import { client } from '../api-client'

import { MentorsStats } from '@/types/mentors/stats.type'

export function createProjectAPI(partnerId: string, projectName: string) {
  return client(`/partners/${partnerId}/projects`, {
    body: { projectName }
  })
}

export function useMentorStats() {
  const orgId = useSession().data?.user?.organization.id
  return useSWR<MentorsStats>([`partners/${orgId}/mentors/stats`])
}
