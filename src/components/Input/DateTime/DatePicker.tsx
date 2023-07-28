import { DatePickerProps } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'

import { StyledDatePicker } from './DatePicker.styled'

export default function DatePicker(props: DatePickerProps<Dayjs>) {
  return <StyledDatePicker {...props} />
}
