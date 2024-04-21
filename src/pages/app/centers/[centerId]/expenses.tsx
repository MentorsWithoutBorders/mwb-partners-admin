import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'
import React from 'react'

import CenterExpensesModal from '@/containers/CenterExpenses/CenterExpensesModal'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import { client } from '@/lib/api-client'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import type { CenterBalance } from '@/types/expenses/centerBalance.type'
import type { CenterExpense } from '@/types/expenses/centerExpense.type'
import type { CenterExpensePaid } from '@/types/expenses/centerExpensePaid.type'
import { WithAuthentication } from '@/types/with-authentication/with-authentication.type'

export const getServerSideProps = (async (context) => {
  const accessToken = (
    await getServerSession(context.req, context.res, authOptions)
  )?.accessToken

  const { month, year } = context.query

  const expenses = await client(
    `centers/${context?.params?.centerId}/expenses`,
    {
      accessToken,
      query: { month: month as string, year: year as string }
    }
  )

  const balance = await client(
    `centers/${context?.params?.centerId}/expenses/balance`,
    {
      accessToken,
      query: { month: month as string, year: year as string }
    }
  )

  const expensePaid = await client(
    `centers/${context?.params?.centerId}/expenses/paid`,
    {
      accessToken,
      query: { month: month as string, year: year as string }
    }
  )

  return { props: { expenses, balance, expensePaid } }
}) satisfies GetServerSideProps<{
  expenses: CenterExpense[]
  balance: CenterBalance
  expensePaid: CenterExpensePaid
}>

const CenterExpenses: WithAuthentication<
  NextPage<{
    expenses: CenterExpense[]
    balance: CenterBalance
    expensePaid: CenterExpensePaid
  }>
> = ({ expenses, balance, expensePaid }) => {
  return (
    <DashboardLayout title="Expenses">
      <CenterExpensesModal
        expenses={expenses}
        balance={balance}
        expensePaid={expensePaid}
      />
    </DashboardLayout>
  )
}

CenterExpenses.requiresAuthentication = true

export default CenterExpenses
