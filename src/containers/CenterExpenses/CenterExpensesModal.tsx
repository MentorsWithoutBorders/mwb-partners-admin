import { Box, Modal, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import ExpenseFilters from './ExpenseFilters'
import ExpenseRow from './ExpenseRow'
import { Months } from './Months.type'

import Button from '@/components/Button/Button'
import Loader from '@/components/Loader/Loader'
import { innerModalStyle } from '@/components/Table/DataModal/DataModal.styled'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import {
  useCreateExpense,
  useDeleteExpense,
  useUpdateExpense
} from '@/lib/expenses/expenses-client'
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
  const { centerId, month, year } = router.query as {
    centerId: string
    month: string
    year: string
  }

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
      month: parseInt(month),
      year: parseInt(year)
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

  const onFilterChange = (month: Months, year: number) => {
    router.push(`/app/centers/${centerId}/expenses?month=${month}&year=${year}`)
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
            <ExpenseFilters
              month={parseInt(month)}
              year={parseInt(year)}
              onFilterChange={onFilterChange}
            />
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
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={addExpense}
              >
                Add item
              </Button>
              <Box display={'flex'} justifyContent={'end'} gap={'16px'}>
                <Button
                  type="submit"
                  color="secondary"
                  variant="outlined"
                  sx={{ mt: 2 }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Save
                </Button>
              </Box>
            </form>
          </Loader>
        </Box>
      </Modal>
    </DashboardLayout>
  )
}
