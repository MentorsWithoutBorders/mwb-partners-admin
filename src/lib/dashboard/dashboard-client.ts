import { useSession } from 'next-auth/react'
import useSWR from 'swr'

export interface NgoStatsCount {
    totalCourses: string,
    totalHours: string,
    totalStudents: string,
    totalMetors: string
}
export interface NgoStats {
    ngoStats: NgoStatsCount
}
export function useGetDashboardDetails(isAll: boolean) {
    const orgId = useSession().data?.user?.organization.id

    return isAll ? useSWR<NgoStats>(`partners/dashboard/stats`) : useSWR<NgoStats>(`partners/${orgId}/dashboard/stats`)
}