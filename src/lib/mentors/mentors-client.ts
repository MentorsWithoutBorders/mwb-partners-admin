import { useSession } from 'next-auth/react'
import useSWR from 'swr'

import { client } from '../api-client'

import {
  Mentor,
  MentorDetails,
  PartnerProject
} from '@/types/mentors/mentor.type'
import { MentorsStats } from '@/types/mentors/stats.type'

export function createProjectAPI(partnerId: string, projectName: string) {
  return client(`partners/${partnerId}/projects`, {
    body: { projectName }
  })
}

export interface MentorsSearchParams {
  searchString?: string
  courseFromDate?: string
  courseToDate?: string
  searchByName?: boolean
  searchByEmail?: boolean
  searchByStudent?: boolean
  searchByStudentOrganization?: boolean
}

export function useGetMentorStats(params: MentorsSearchParams) {
  const orgId = useSession().data?.user?.organization.id
  const query = new URLSearchParams(params as Record<string, string>).toString()
  return useSWR<MentorsStats>(`partners/${orgId}/mentors/stats?${query}`)
}

export function useGetMentors(params: MentorsSearchParams) {
  const orgId = useSession().data?.user?.organization.id
  const query = new URLSearchParams(params as Record<string, string>).toString()
  return useSWR<Mentor[]>(`partners/${orgId}/mentors?${query}`)
}

export function useGetMentorDetails(mentorId: string | null) {
  const orgId = useSession().data?.user?.organization.id
  return useSWR<MentorDetails>(
    mentorId ? `partners/${orgId}/mentors/${mentorId}` : null
  )
}

export function useGetProjectDetails() {
  const orgId = useSession().data?.user?.organization.id
  return useSWR<PartnerProject[]>(orgId ? `partners/${orgId}/projects` : null)
}
