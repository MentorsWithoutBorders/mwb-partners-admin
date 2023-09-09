import { Box, Typography } from '@mui/material'
import React from 'react'

import {
  DashboardItemContainer,
  DashboardItemIcon,
  DashboardItemTitle,
  DashboardItemValue
} from './DashboardItem.styled'

interface DashboardItemProps {
  title: string
  icon: React.ReactNode
  value: string | number
}

const DashboardItem = ({ title, icon, value }: DashboardItemProps) => {
  return (
    <DashboardItemContainer>
      <DashboardItemIcon>{icon}</DashboardItemIcon>
      <Box>
        <DashboardItemTitle>{title}</DashboardItemTitle>
        <DashboardItemValue>{value}</DashboardItemValue>
      </Box>
    </DashboardItemContainer>
  )
}

export default DashboardItem
