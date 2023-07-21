import styled from '@emotion/styled'
import { Avatar, Box, Typography } from '@mui/material'

export const UserDetailsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '20px',
  alignItems: 'center'
}))

export const UserDetailsAvatar = styled(Avatar)(({ theme }) => ({
  width: 38,
  height: 38,
  backgroundColor: theme.palette.secondary?.main
}))

export const UserDetailsName = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 16
}))
