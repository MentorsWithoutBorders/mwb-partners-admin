import { Close } from '@mui/icons-material'
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton
} from '@mui/material'
import React from 'react'
import { Control, Controller, UseFormRegister } from 'react-hook-form'

import { ExpensesForm } from './ExpensesForm.type'

import TextField from '@/components/Input/TextField/TextField'
import type { CenterExpense } from '@/types/expenses/centerExpense.type'

export default function ExpenseRow({
  index,
  register,
  removeExpense,
  control,
  expense,
  isUnsavedRecurringExpense
}: {
  index: number
  register: UseFormRegister<ExpensesForm>
  removeExpense: (expenseIndex: number, expenseId: string) => void
  control: Control<ExpensesForm, any>
  expense: CenterExpense
  isUnsavedRecurringExpense: boolean
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
          {...register(`expenses.${index}.expense`, {
            required: 'This field is required'
          })}
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
          {...register(`expenses.${index}.amount`, {
            required: 'This field is required'
          })}
        />
      </Grid>
      {!isUnsavedRecurringExpense && (
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
      )}
      <Grid item xs={1}>
        <IconButton
          aria-label="delete expense"
          onClick={() => removeExpense(index, expense.id)}
        >
          <Close color={'error'} />
        </IconButton>
      </Grid>
    </Grid>
  )
}
