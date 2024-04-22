import { useSession } from 'next-auth/react'
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
  { link: '/app/students', title: 'Students', icon: <StudentIcon /> },
  { link: '/app/centers', title: 'Centers', icon: <DashboardIcon /> }
]

export function DashboardLayout({
  title,
  children
}: {
  title: ReactNode
  children: ReactNode
}) {
  const { data: session } = useSession()

  return (
    <Layout>
      <LayoutSidebar links={SIDEBAR_LINKS} />

      <LayoutContent
        header={
          <LayoutHeader>
            <UserDetails
              name={session?.user?.name ?? ''}
              email={session?.user?.email ?? ''}
              avatar=""
            />
            <Logout />
          </LayoutHeader>
        }
      >
        {children}
      </LayoutContent>
    </Layout>
  )
}
