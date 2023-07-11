import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'

interface DashboardItemProps {
  title: string
  icon: React.ReactNode
  value: string
}

const DashboardItem = ({ title, icon, value }: DashboardItemProps) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          width: '46px',
          height: '46px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.zircon
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: '500',
            color: theme.palette.mineShaft
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: '700',
            color: theme.palette.mineShaft
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

export default DashboardItem
