import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import { client } from '../api-client'

import { CenterExpense } from '@/types/expenses/centerExpense.type'
import { CenterExpensePaid } from '@/types/expenses/centerExpensePaid.type'

export function useGetExpenses(centerId: string) {
  return useSWR<CenterExpense[]>(`centers/${centerId}/expenses`)
}

async function createExpense(
  url: string,
  { arg: { expense } }: { arg: { expense: CenterExpense } }
) {
  const { centerId, id, ...body } = expense
  return await client(url.replaceAll(':centerId', centerId), {
    body
  })
}
export function useCreateExpense() {
  return useSWRMutation(`centers/:centerId/expenses`, createExpense)
}

async function updateExpense(
  url: string,
  { arg: { expense } }: { arg: { expense: CenterExpense } }
) {
  const { id, ...others } = expense
  return await client(
    url.replaceAll(':centerId', others.centerId).replaceAll(':expenseId', id),
    {
      method: 'PATCH',
      body: others
    }
  )
}
export function useUpdateExpense() {
  return useSWRMutation(`centers/:centerId/expenses/:expenseId`, updateExpense)
}

async function deleteExpense(
  url: string,
  {
    arg: { expenseId, centerId }
  }: { arg: { expenseId: string; centerId: string } }
) {
  return await client(
    url.replaceAll(':centerId', centerId).replaceAll(':expenseId', expenseId),
    { method: 'DELETE' }
  )
}
export function useDeleteExpense() {
  return useSWRMutation(`centers/:centerId/expenses/:expenseId`, deleteExpense)
}

async function updateExpensePaid(
  url: string,
  {
    arg: { expensePaid }
  }: { arg: { expensePaid: Omit<CenterExpensePaid, 'id'> } }
) {
  const { centerId, ...body } = expensePaid
  return await client(url.replaceAll(':centerId', centerId), {
    method: 'PATCH',
    body
  })
}
export function useUpdateExpensePaid() {
  return useSWRMutation(`centers/:centerId/expenses/paid`, updateExpensePaid)
}
