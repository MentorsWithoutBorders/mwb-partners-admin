import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const DashboardItemContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '20px'
}))

export const DashboardItemIcon = styled(Box)(({ theme }) => ({
  width: '46px',
  height: '46px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.zircon,
  borderRadius: '100%'
}))

export const DashboardItemTitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '500',
  color: theme.palette.mineShaft
}))

export const DashboardItemValue = styled(Typography)(({ theme }) => ({
  fontSize: '40px',
  fontWeight: '700',
  color: theme.palette.mineShaft
}))
