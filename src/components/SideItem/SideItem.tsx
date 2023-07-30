import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface SideItemProps {
  link: string
  title: string
  icon: React.ReactNode
  exact?: boolean
}

export default function SideItem({ link, title, icon, exact }: SideItemProps) {
  const router = useRouter()

  const isLinkActive = (path: string, exact: boolean = false) => {
    if (exact) return path === router.pathname
    return router.pathname.startsWith(path)
  }

  return (
    <ListItem key={link} disablePadding>
      <ListItemButton
        selected={isLinkActive(link, exact)}
        href={link}
        LinkComponent={Link}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  )
}
