import { Box, Modal, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import ExpenseRow from './ExpenseRow'

import Button from '@/components/Button/Button'
import Loader from '@/components/Loader/Loader'
import { innerModalStyle } from '@/components/Table/DataModal/DataModal.styled'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import { client } from '@/lib/api-client'
import {
  useCreateExpense,
  useDeleteExpense,
  useUpdateExpense
} from '@/lib/expenses/expenses-client'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import type { Expense } from '@/types/expenses/expense.type'

function hasExpenseChanged(originalExpense: Expense, newExpense: Expense) {
  return (
    originalExpense.expense !== newExpense.expense ||
    originalExpense.amount !== newExpense.amount ||
    originalExpense.isRecurring !== newExpense.isRecurring
  )
}

const centerExpensesModalTitle = 'center-expenses-modal-title'

export default function CenterExpensesModal({
  expenses
}: {
  expenses: Expense[]
}) {
  const [saving, setSaving] = useState(false)
  const [deletedExpenses, setDeletedExpenses] = useState<string[]>([])
  const router = useRouter()
  const { centerId } = router.query as { centerId: string }

  const { trigger: createExpense } = useCreateExpense()

  const { trigger: updateExpense } = useUpdateExpense()

  const { trigger: deleteExpense } = useDeleteExpense()

  const { register, handleSubmit, control } = useForm({
    defaultValues: { expenses },
    values: { expenses }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expenses',
    keyName: 'key'
  })

  const addExpense = () =>
    append({
      id: '',
      expense: '',
      amount: 0,
      isRecurring: false,
      centerId,
      month: 1,
      year: 2024
    })

  const pushDeletedExpense = (expenseId: string) => {
    setDeletedExpenses((preDeletedExpenses) => [
      ...preDeletedExpenses,
      expenseId
    ])
  }

  const removeExpense = (expenseIndex: number, expenseId: string) => {
    pushDeletedExpense(fields[expenseIndex]?.id)
    remove(expenseIndex)
  }

  const onSubmit = (values: { expenses: Expense[] }) => {
    const allPromises: Promise<any>[] = []
    values.expenses.forEach((expense) => {
      const originalExpense = expenses.find((e) => e.id === expense.id)

      if (originalExpense) {
        if (hasExpenseChanged(originalExpense, expense)) {
          allPromises.push(updateExpense({ expense }))
        }
      } else {
        allPromises.push(createExpense({ expense }))
      }
    })

    if (deletedExpenses.length > 0) {
      deletedExpenses.forEach((expenseId) => {
        allPromises.push(
          deleteExpense({
            centerId,
            expenseId
          })
        )
      })
    }

    setSaving(true)
    Promise.all(allPromises)
      .then(() => {
        router.push(`/app/centers/${centerId}/expenses`)
      })
      .finally(() => setSaving(false))
  }

  return (
    <DashboardLayout title="Expenses">
      <Modal aria-labelledby={centerExpensesModalTitle} open={true}>
        <Box sx={innerModalStyle} position={'relative'}>
          <Loader isLoading={saving}>
            <Typography
              id={centerExpensesModalTitle}
              variant="h5"
              component="h2"
              textAlign="center"
              fontWeight={500}
            >
              Anchor of Hope - expenses
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              {fields?.map((field, index) => (
                <ExpenseRow
                  index={index}
                  key={field.key}
                  expense={field}
                  control={control}
                  register={register}
                  removeExpense={removeExpense}
                />
              ))}
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                onClick={addExpense}
              >
                Add
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
              >
                Save
              </Button>
            </form>
          </Loader>
        </Box>
      </Modal>
    </DashboardLayout>
  )
}
