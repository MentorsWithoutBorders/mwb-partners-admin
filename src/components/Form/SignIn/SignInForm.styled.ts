import styled from '@emotion/styled'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Button from '@/components/Button/Button'

export const StyledSignInFormTitleContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3)
})) as typeof Box

export const StyledSignInFormTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.625rem'
})) as typeof Typography

export const StyledSignInFormAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(2)
})) as typeof Alert

export const StyledSignInFormButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2)
})) as typeof Button

export const StyledSignInFormCheckboxContainer = styled(Grid)(({ theme }) => ({
  alignItems: 'center'
})) as typeof Grid

export const StyledSignInFormLinkContainer = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(1)
})) as typeof Grid

export const StyledSignInFormText = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500
})) as typeof Typography
