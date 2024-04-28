import { Box, Grid, Modal, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import ExpenseFilters from './ExpenseFilters'
import ExpenseRow from './ExpenseRow'
import { ExpensesForm } from './ExpensesForm.type'
import { Months } from './Months.type'

import Button from '@/components/Button/Button'
import TextField from '@/components/Input/TextField/TextField'
import Loader from '@/components/Loader/Loader'
import { innerModalStyle } from '@/components/Table/DataModal/DataModal.styled'
import {
  useCreateExpense,
  useDeleteExpense,
  useUpdateExpense,
  useUpdateExpensePaid
} from '@/lib/expenses/expenses-client'
import type { CenterBalance } from '@/types/expenses/centerBalance.type'
import type { CenterExpense } from '@/types/expenses/centerExpense.type'
import { CenterExpensePaid } from '@/types/expenses/centerExpensePaid.type'

function hasExpenseChanged(
  originalExpense: CenterExpense,
  newExpense: CenterExpense
) {
  return (
    originalExpense.expense !== newExpense.expense ||
    originalExpense.amount != newExpense.amount ||
    originalExpense.isRecurring !== newExpense.isRecurring
  )
}

const centerExpensesModalTitle = 'center-expenses-modal-title'

export default function CenterExpensesModal({
  expenses,
  balance,
  expensePaid
}: {
  expenses: CenterExpense[]
  balance: CenterBalance
  expensePaid: CenterExpensePaid
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

  const { trigger: updateExpensePaid } = useUpdateExpensePaid()

  const { register, handleSubmit, control, getValues, reset } =
    useForm<ExpensesForm>({
      defaultValues: { expenses, expensePaidAmount: '' },
      values: { expenses, expensePaidAmount: '' }
    })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expenses',
    keyName: 'key'
  })

  const addExpense = () =>
    append({
      id: crypto.getRandomValues(new Uint32Array(1))[0].toString(),
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
    if (!isUnsavedRecurringExpense(fields[expenseIndex])) {
      pushDeletedExpense(fields[expenseIndex]?.id)
    }
    remove(expenseIndex)
  }

  const isUnsavedRecurringExpense = (expense: CenterExpense) => {
    return (
      (expense.month !== parseInt(month) || expense.year !== parseInt(year)) &&
      expense.isRecurring
    )
  }

  const onSubmit = (values: ExpensesForm) => {
    const allPromises: Promise<any>[] = []

    const expensePaidAmountNumber = Number.parseInt(
      `${values?.expensePaidAmount}`,
      10
    )

    if (!Number.isNaN(expensePaidAmountNumber)) {
      const previousExpensePaid = expensePaid?.amount || 0
      allPromises.push(
        updateExpensePaid({
          expensePaid: {
            centerId,
            amount: previousExpensePaid + expensePaidAmountNumber,
            month: parseInt(month),
            year: parseInt(year)
          }
        })
      )
    }

    values.expenses.forEach((expense) => {
      const originalExpense = expenses.find((e) => e.id === expense.id)

      if (originalExpense) {
        if (isUnsavedRecurringExpense(expense)) {
          allPromises.push(
            createExpense({
              expense: {
                expense: expense.expense,
                amount: expense.amount,
                month: parseInt(month),
                year: parseInt(year),
                centerId: expense.centerId,
                isRecurring: false
              }
            })
          )
        } else if (hasExpenseChanged(originalExpense, expense)) {
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
        router.replace(router.asPath)
      })
      .finally(() => setSaving(false))
  }

  const onFilterChange = (month: Months, year: number) => {
    router.push(`/app/centers/${centerId}/expenses?month=${month}&year=${year}`)
  }

  const onClose = () => {
    router.push(`/app`)
  }

  const totalExpenseCurrentMonth = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  )

  return (
    <Modal
      open={true}
      aria-labelledby={centerExpensesModalTitle}
      onClose={onClose}
    >
      <Box sx={innerModalStyle} position={'relative'}>
        <Loader isLoading={saving}>
          <Typography
            id={centerExpensesModalTitle}
            variant="h5"
            component="h2"
            textAlign="center"
            fontWeight={500}
            paddingBottom={'36px'}
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
                isUnsavedRecurringExpense={isUnsavedRecurringExpense(field)}
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
            <Grid container alignItems={'center'} columns={12}>
              <Grid item xs={8} display={'flex'} justifyContent={'end'}>
                <Typography width={'100px'}>Total:</Typography>
              </Grid>
              <Grid item xs={4}>
                <div>{`$ ${totalExpenseCurrentMonth} USD`}</div>
              </Grid>
              <Grid item xs={8} display={'flex'} justifyContent={'end'}>
                <Typography width={'100px'}>Paid:</Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="expensePaidAmount"
                  type="number"
                  margin="normal"
                  placeholder="Amount"
                  {...register('expensePaidAmount')}
                />
              </Grid>
              <Grid item xs={8} display={'flex'} justifyContent={'end'}>
                <Typography width={'100px'}>Balance:</Typography>
              </Grid>
              <Grid item xs={4}>
                <Box color={balance.balance > 0 ? 'green' : 'red'}>
                  {`$ ${balance.balance} USD`}
                </Box>
              </Grid>
            </Grid>
            <Box display={'flex'} justifyContent={'end'} gap={'16px'}>
              <Button
                type="button"
                color="secondary"
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={onClose}
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
  )
}
