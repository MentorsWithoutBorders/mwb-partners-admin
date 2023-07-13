import { ButtonProps } from '@mui/material/Button'

import { StyledButton } from './Button.styled'

export default function Button(props: ButtonProps) {
  return <StyledButton {...props} />
}
