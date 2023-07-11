import styled from '@emotion/styled'
import MuiButton, { ButtonProps } from '@mui/material/Button'

export const Button = styled(MuiButton)<ButtonProps>(({ theme }) => ({
  borderRadius: '10px',
  fontWeight: 600,
  fontSize: '16px'
}))
