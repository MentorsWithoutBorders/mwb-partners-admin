import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { SideItemWrapper, SidebarText } from './SideItem.styled'

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
    <Link href={link} style={{ textDecoration: 'none' }}>
      <SideItemWrapper active={isLinkActive(link, exact)}>
        {icon}
        <SidebarText>{title}</SidebarText>
      </SideItemWrapper>
    </Link>
  )
}
