import { Close } from '@mui/icons-material'
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField
} from '@mui/material'
import React from 'react'
import { Control, Controller, UseFormRegister } from 'react-hook-form'

import type { Expense } from '@/types/expenses/expense.type'

export default function ExpenseRow({
  index,
  register,
  removeExpense,
  control,
  expense
}: {
  index: number
  register: UseFormRegister<{
    expenses: Expense[]
  }>
  removeExpense: (expenseIndex: number, expenseId: string) => void
  control: Control<
    {
      expenses: Expense[]
    },
    any
  >
  expense: Expense
}) {
  return (
    <Grid container spacing={4} alignItems={'center'}>
      <Grid item xs={7}>
        <TextField
          id="expense"
          required
          fullWidth
          placeholder="Expense item"
          margin="normal"
          {...register(`expenses.${index}.expense`)}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="amount"
          placeholder="Amount"
          type="number"
          {...register(`expenses.${index}.amount`)}
        />
      </Grid>
      <Grid item xs={2}>
        <Controller
          name={`expenses.${index}.isRecurring`}
          control={control}
          render={({ field }) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    id={'isRecurring'}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    checked={field.value}
                  />
                }
                label={'Recurring'}
              />
            )
          }}
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton
          aria-label="delete expense"
          onClick={() => removeExpense(index, expense.id)}
          edge="end"
        >
          <Close color={'error'} />
        </IconButton>
      </Grid>
    </Grid>
  )
}
