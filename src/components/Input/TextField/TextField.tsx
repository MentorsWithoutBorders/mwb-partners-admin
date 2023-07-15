import Box from '@mui/material/Box'
import { TextFieldProps } from '@mui/material/TextField'

import { StyledInputLabel, StyledTextField } from './TextField.styled'

export function TextField(props: TextFieldProps) {
  const { label, ...rest } = props

  return (
    <Box sx={{ display: 'block' }}>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextField {...rest} />
    </Box>
  )
}
