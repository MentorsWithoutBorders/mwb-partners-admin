import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import React, { FocusEvent, KeyboardEvent, MouseEvent } from 'react'

import { CommonDropdown } from '@/components/Dropdown/Dropdown'
import { StyledOption } from '@/components/Dropdown/Dropdown.styled'
import Months from '@/lib/enums/months'

interface ExpenseFiltersProps {
  month: Months
  year: number
  onFilterChange: (month: Months, year: number) => void
}

function generateYears() {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = -5; i < 2; i++) {
    years.push(currentYear + i)
  }
  return years
}

function ExpenseFilters({
  month,
  year,
  onFilterChange
}: React.PropsWithChildren<ExpenseFiltersProps>) {
  const years = generateYears()

  const handleMonthChange = (_: any, value: Months | null | {}) => {
    onFilterChange(value as Months, year)
  }

  const handleYearChange = (_: any, value: number | null | {}) => {
    onFilterChange(month, value as number)
  }

  const monthOptions = Object.keys(Months)
    .filter((key) => isNaN(Number(key)))
    .map((month) => ({
      id: Months[month as keyof typeof Months],
      name: month
    }))

  return (
    <Box display={'flex'} gap={'16px'} paddingBottom={'8px'}>
      <Box width={'200px'}>
        <CommonDropdown id="month" value={month} onChange={handleMonthChange}>
          {monthOptions.map((month) => (
            <StyledOption key={month.id} value={month.id}>
              {month.name}
            </StyledOption>
          ))}
        </CommonDropdown>
      </Box>

      <Box width={'100px'}>
        <CommonDropdown id="year" value={year} onChange={handleYearChange}>
          {years.map((year, index) => (
            <StyledOption key={index} value={year}>
              {year}
            </StyledOption>
          ))}
        </CommonDropdown>
      </Box>
    </Box>
  )
}

export default ExpenseFilters
