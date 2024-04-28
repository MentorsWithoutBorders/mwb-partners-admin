import { GetServerSideProps, NextPage } from 'next'
import Error from 'next/error'
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

interface ExpensesPageData {
  expenses: CenterExpense[]
  balance: CenterBalance
  expensePaid: CenterExpensePaid
}

interface ExpensePageError {
  code: number
  message: string
}

interface ExpensesPageProps {
  data?: ExpensesPageData
  error?: ExpensePageError
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
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

    return { props: { data: { expenses, balance, expensePaid } } }
  } catch (e: any) {
    return { props: { error: e.message, code: 500 } }
  }
}

const CenterExpenses: WithAuthentication<NextPage<ExpensesPageProps>> = ({
  data,
  error
}) => {
  return (
    <DashboardLayout title="Expenses">
      {error && <Error statusCode={error.code} title={error.message} />}
      {data && (
        <CenterExpensesModal
          expenses={data.expenses}
          balance={data.balance}
          expensePaid={data.expensePaid}
        />
      )}
    </DashboardLayout>
  )
}

CenterExpenses.requiresAuthentication = true

export default CenterExpenses
