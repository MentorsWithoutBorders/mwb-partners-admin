import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import { client } from '../api-client'

import { Expense } from '@/types/expenses/expense.type'

export function useGetExpenses(centerId: string) {
  return useSWR<Expense[]>(`centers/${centerId}/expenses`)
}

async function createExpense(
  url: string,
  { arg: { expense } }: { arg: { expense: Expense } }
) {
  return await client(url.replaceAll(':centerId', expense.centerId), {
    body: expense
  }).then((res) => res.json())
}
export function useCreateExpense() {
  return useSWRMutation(`centers/:centerId/expenses`, createExpense)
}

async function updateExpense(
  url: string,
  { arg: { expense } }: { arg: { expense: Expense } }
) {
  const { id, ...others } = expense
  return await client(
    url.replaceAll(':centerId', others.centerId).replaceAll(':expenseId', id),
    {
      method: 'PATCH',
      body: others
    }
  ).then((res) => res.json())
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
  ).then((res) => res.json())
}
export function useDeleteExpense() {
  return useSWRMutation(`centers/:centerId/expenses/:expenseId`, deleteExpense)
}
