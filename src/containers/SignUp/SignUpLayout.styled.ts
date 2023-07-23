import styled from '@emotion/styled'
import Grid from '@mui/material/Grid'

export const SignUpLayoutContainer = styled(Grid)(({ theme }) => ({
  height: '100vh'
})) as typeof Grid

export const SignUpFormContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
})) as typeof Grid
