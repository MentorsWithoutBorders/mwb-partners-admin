import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'
import React from 'react'

import CenterExpensesModal from '@/containers/CenterExpenses/CenterExpensesModal'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import { client } from '@/lib/api-client'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import type { Expense } from '@/types/expenses/expense.type'
import { WithAuthentication } from '@/types/with-authentication/with-authentication.type'

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

const CenterExpenses: WithAuthentication<
  NextPage<{
    expenses: Expense[]
  }>
> = ({ expenses }) => {
  return (
    <DashboardLayout title="Expenses">
      <CenterExpensesModal expenses={expenses} />
    </DashboardLayout>
  )
}

CenterExpenses.requiresAuthentication = true

export default CenterExpenses
