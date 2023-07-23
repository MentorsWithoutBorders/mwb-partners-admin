import styled from '@emotion/styled'
import Grid from '@mui/material/Grid'

export const AuthLayoutContainer = styled(Grid)(({ theme }) => ({
  height: '100vh'
})) as typeof Grid

export const AuthFormContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
})) as typeof Grid
