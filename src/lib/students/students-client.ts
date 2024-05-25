import { useSession } from 'next-auth/react'
import useSWR from 'swr'

import { client } from '../api-client'

import { StudentsStats } from '@/types/students/stats.type'
import { Student } from '@/types/students/student.type'

export interface StudentsSearchParams {
  courseFromDate?: string
  courseToDate?: string

  searchString?: string
  searchByName?: boolean
  searchByEmail?: boolean
  searchByStudentStatus?: boolean
  searchByStudentOrganization?: boolean
}

export function useGetStudentStats(params: StudentsSearchParams) {
  const orgId = useSession().data?.user?.organization.id
  const query = new URLSearchParams(params as Record<string, string>).toString()
  return useSWR<StudentsStats>(`partners/${orgId}/students/stats?${query}`)
}

export function useGetStudents(params: StudentsSearchParams) {
  const orgId = useSession().data?.user?.organization.id
  const query = new URLSearchParams(params as Record<string, string>).toString()
  return useSWR<Student[]>(`partners/${orgId}/students?${query}`)
}

export function useUploadTestimonial() {
  const orgId = useSession().data?.user?.organization.id

  return (studentId: string, youtubeUrl: string) =>
    client(`partners/${orgId}/students/${studentId}/testimonials`, {
      method: 'POST',
      body: {
        url: youtubeUrl
      }
    })
}
