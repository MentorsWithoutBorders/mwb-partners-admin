import { Close } from '@mui/icons-material'
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { innerModalStyle } from '@/components/Table/DataModal/DataModal.styled'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import { useGetExpenses } from '@/lib/expenses/expenses-client'
import type { Expense } from '@/types/expenses/expense.type'

const centerExpensesModalTitle = 'center-expenses-modal-title'

function Expense({ expense }: { expense: Expense }) {
  return (
    <Grid container spacing={4} alignItems={'center'}>
      <Grid item xs={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="expenseItem"
          placeholder="Expense item"
          value={expense.expense}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="amount"
          placeholder="Amount"
          value={expense.amount}
        />
      </Grid>
      <Grid item xs={2}>
        <FormControlLabel
          control={
            <Checkbox
              id={'isRecurring'}
              checked={expense.isRecurring}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                console.log(evt.target.checked)
              }
            />
          }
          label={'Recurring'}
        />
      </Grid>
      <Grid item xs={2}>
        <IconButton
          aria-label="delete expense"
          onClick={() => console.log('delete expense')}
          edge="end"
        >
          <Close color={'error'} />
        </IconButton>
      </Grid>
    </Grid>
  )
}

function CenterExpensesModal() {
  const router = useRouter()

  const [unsavedExpenses, setUnsavedExpenses] = useState()

  const centerId = router.query?.centerId as string

  const { data: expenses, isLoading } = useGetExpenses(centerId)

  return (
    <DashboardLayout title="Expenses">
      <Modal aria-labelledby={centerExpensesModalTitle} open={true}>
        <Box sx={innerModalStyle}>
          <Typography
            id={centerExpensesModalTitle}
            variant="h5"
            component="h2"
            textAlign="center"
            fontWeight={500}
          >
            Anchor of Hope - expenses
          </Typography>
          {expenses?.map((expense) => (
            <Expense key={expense.id} expense={expense} />
          ))}
        </Box>
      </Modal>
    </DashboardLayout>
  )
}

CenterExpensesModal.requiresAuthentication = true

export default CenterExpensesModal
