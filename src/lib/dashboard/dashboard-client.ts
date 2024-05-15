import { useSession } from 'next-auth/react'
import useSWR from 'swr'

export interface NgoStatsCount {
  totalCourses: string
  totalHours: string
  totalStudents: string
  totalMentors: string
}
export interface NgoStats {
  ngoStats: NgoStatsCount
}
export function useGetDashboardDetails(isAll: boolean) {
  const orgId = useSession().data?.user?.organization.id
  const url = isAll
    ? `partners/dashboard/stats`
    : `partners/${orgId}/dashboard/stats`

  return useSWR<NgoStats>(url)
}
