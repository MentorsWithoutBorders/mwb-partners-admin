import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const SideItemWrapper = styled(Box)<{ active: boolean }>(
  ({ theme, active }) => ({
    color: 'white',
    backgroundColor: active ? theme.palette.primary.main : 'transparent',
    padding: '18px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontWeight: 500
  })
)

export const SidebarText = styled(Typography)(({ theme }) => ({}))
