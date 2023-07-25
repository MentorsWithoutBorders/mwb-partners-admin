import Box from '@mui/material/Box'
import { TextFieldProps } from '@mui/material/TextField'
import { RefObject, forwardRef } from 'react'

import { StyledInputLabel, StyledTextField } from './TextField.styled'

// create the types for ref on this component
function TextField(
  { label, ...props }: TextFieldProps,
  ref:
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
    | null
    | undefined
) {
  return (
    <Box sx={{ display: 'block' }}>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextField ref={ref} {...props} />
    </Box>
  )
}

export default forwardRef<HTMLInputElement, TextFieldProps>(TextField)
