import { useSession } from 'next-auth/react'
import useSWR from 'swr'

import { client } from '../api-client'

import { MentorsStats } from '@/types/mentors/stats.type'

export function createProjectAPI(partnerId: string, projectName: string) {
  return client(`/partners/${partnerId}/projects`, {
    body: { projectName }
  })
}

export function useMentorStats(params: {
  searchString?: string
  courseFromDate?: string
  courseToDate?: string
  searchByName?: boolean
  searchByEmail?: boolean
  searchByStudent?: boolean
  searchByStudentOrganization?: boolean
}) {
  const orgId = useSession().data?.user?.organization.id
  const query = new URLSearchParams(params as Record<string, string>).toString()
  return useSWR<MentorsStats>(`partners/${orgId}/mentors/stats?${query}`)
}
