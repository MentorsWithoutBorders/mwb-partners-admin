import styled from '@emotion/styled'
import { OutlinedInput } from '@mui/material'

export const FilterOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: 10,
  fontWeight: 400,
  height: 32,
  backgroundColor: 'white',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.palette.primary.main,
  left: 0,
  top: 0,
  fontSize: 16,
  margin: 6,
  padding: 10,
  fieldset: { padding: 0, margin: 0 }
}))
