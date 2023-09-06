import styled from '@emotion/styled'
import Button, { ButtonProps } from '@mui/material/Button'

export const StyledButton = styled(Button)<ButtonProps>(() => ({
  borderRadius: '10px',
  fontWeight: 600,
  fontSize: '16px'
}))
