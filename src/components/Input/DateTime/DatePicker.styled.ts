import styled from '@emotion/styled'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'

export const StyledDatePicker = styled(
  MuiDatePicker as typeof MuiDatePicker<Dayjs>
)`
  & input {
    padding: 0.5rem;
  }
`
