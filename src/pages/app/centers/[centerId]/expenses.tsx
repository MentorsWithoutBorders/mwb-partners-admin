import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import React from 'react'

import CenterExpensesModal from '@/containers/CenterExpenses/CenterExpensesModal'
import { client } from '@/lib/api-client'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import type { Expense } from '@/types/expenses/expense.type'

export const getServerSideProps = (async (context) => {
  const accessToken = (
    await getServerSession(context.req, context.res, authOptions)
  )?.accessToken

  const { month, year } = context.query

  const response = await client(
    `centers/${context?.params?.centerId}/expenses`,
    {
      accessToken,
      query: { month: month as string, year: year as string }
    }
  )
  return { props: { expenses: response } }
}) satisfies GetServerSideProps<{ expenses: Expense[] }>

function CenterExpenses({ expenses }: { expenses: Expense[] }) {
  return <CenterExpensesModal expenses={expenses} />
}

CenterExpenses.requiresAuthentication = true

export default CenterExpenses
