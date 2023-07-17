import styled from '@emotion/styled'
import { ListItem } from '@mui/material'

export const MenuItemContainer = styled(ListItem)<{
  isActive: boolean
}>(({ theme, isActive }) => ({
  cursor: 'pointer',
  backgroundColor: isActive ? ('#000' as string) : 'transparent',
  padding: 0,
  '&:hover': {
    backgroundColor: '#000' as string
  }
}))
