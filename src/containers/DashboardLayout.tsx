import {
  DashboardOutlined,
  SchoolOutlined,
  StarOutlined
} from '@mui/icons-material'
import { Typography } from '@mui/material'
import { ReactNode } from 'react'

import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutSidebar,
  SidebarLink
} from '@/components/Layout'

const SIDEBAR_LINKS: SidebarLink[] = [
  { link: '/app', title: 'Dashboard', icon: DashboardOutlined, exact: true },
  { link: '/app/mentors', title: 'Mentors', icon: StarOutlined },
  { link: '/app/students', title: 'Students', icon: SchoolOutlined }
]

export function DashboardLayout({
  title,
  children
}: {
  title: ReactNode
  children: ReactNode
}) {
  return (
    <Layout>
      <LayoutSidebar links={SIDEBAR_LINKS} />

      <LayoutHeader>
        <Typography variant="h6" noWrap component="h2">
          {title}
        </Typography>
      </LayoutHeader>

      <LayoutContent>{children}</LayoutContent>
    </Layout>
  )
}
