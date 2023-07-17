import React from 'react'

import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import { MenuItemContainer } from './MenuItem.styled'
import Link from 'next/link'

interface MenuItemProps {
  icon: React.ReactNode
  isActive: boolean
  href: string
  title: string
}

export default function MenuItem({
  href,
  isActive,
  title,
  icon
}: MenuItemProps) {
  return (
    <MenuItemContainer isActive={isActive}>
      <ListItemButton href={href} LinkComponent={Link}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </MenuItemContainer>
  )
}
