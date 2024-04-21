import { CenterExpense } from '@/types/expenses/centerExpense.type'
import { CenterExpensePaid } from '@/types/expenses/centerExpensePaid.type'

export interface ExpensesForm {
  expenses: CenterExpense[]
  expensePaidAmount?: string
}
