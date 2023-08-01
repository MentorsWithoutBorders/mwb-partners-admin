import { ReactNode } from 'react'

import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutSidebar,
  SidebarLink
} from '@/components/Layout/Layout'
import Logout from '@/components/Logout/Logout'
import UserDetails from '@/components/UserDetails/UserDatails'

import DashboardIcon from '~/icons/dashboard.svg'
import MentorIcon from '~/icons/mentors-white.svg'
import StudentIcon from '~/icons/students-white.svg'

const SIDEBAR_LINKS: SidebarLink[] = [
  {
    link: '/app',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    exact: true
  },
  { link: '/app/mentors', title: 'Mentors', icon: <MentorIcon /> },
  { link: '/app/students', title: 'Students', icon: <StudentIcon /> }
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

      <LayoutContent
        header={
          <LayoutHeader>
            <UserDetails name="John Doe" email="test@email.com" avatar="" />
            <Logout />
          </LayoutHeader>
        }
      >
        {children}
      </LayoutContent>
    </Layout>
  )
}
