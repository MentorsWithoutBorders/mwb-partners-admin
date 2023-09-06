import styled from '@emotion/styled'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Button from '@/components/Button/Button'

export const StyledSignUpFormTitleContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3)
})) as typeof Box

export const StyledSignUpFormTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.625rem'
})) as typeof Typography

export const StyledSignUpFormAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(2)
})) as typeof Alert

export const StyledSignUpFormButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2)
})) as typeof Button

export const StyledSignUpFormLinkContainer = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(1)
})) as typeof Grid

export const StyledSignUpFormText = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500
})) as typeof Typography
