import { Box, Typography } from '@mui/material'
import React from 'react'

interface DashboardItemProps {
  title: string
  icon: React.ReactNode
  value: string
}

const DashboardItem = ({ title, icon, value }: DashboardItemProps) => {
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
          justifyContent: 'center'
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: '500'
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: '700'
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

export default DashboardItem
