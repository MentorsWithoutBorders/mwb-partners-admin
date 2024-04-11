import { useSession } from 'next-auth/react'
import useSWR from 'swr'

import { Expense } from '@/types/expenses/expense.type'

export function useGetExpenses(centerId: string) {
  return useSWR<Expense[]>(`centers/${centerId}/expenses/`)
}
