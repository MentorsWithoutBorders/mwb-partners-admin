import { Box, Drawer, List } from '@mui/material'
import Image from 'next/image'
import {
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react'

import { TopBar } from './Layout.styled'

import SideItem from '@/components/SideItem/SideItem'

const SIDEBAR_WIDTH = 240

const SidebarStateContext = createContext<boolean | null>(null)
const SidebarActionContext = createContext<Dispatch<
  SetStateAction<boolean>
> | null>(null)

export type SidebarLink = {
  link: string
  title: string
  icon: React.ReactNode
  exact?: boolean
}
export function LayoutSidebar({ links }: { links: SidebarLink[] }) {
  const isSidebarOpen = useContext(SidebarStateContext)
  const setIsSidebarOpen = useContext(SidebarActionContext)

  const drawer = (
    <div>
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Image
          src="/mwb-icon-white.png"
          alt="MWB Logo"
          width={80}
          height={80}
        />
      </Box>

      <List>
        {links.map(({ link, title, icon, exact }) => (
          <SideItem
            key={title}
            title={title}
            icon={icon}
            exact={exact}
            link={link}
          />
        ))}
      </List>
    </div>
  )

  return (
    <Box
      component="nav"
      sx={{ width: { sm: SIDEBAR_WIDTH }, flexShrink: { sm: 0 } }}
    >
      {/* drawer shown in small screens */}
      <Drawer
        variant="temporary"
        open={!!isSidebarOpen}
        onClose={() => setIsSidebarOpen?.(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: SIDEBAR_WIDTH
          }
        }}
      >
        {drawer}
      </Drawer>

      {/* drawer shown in large screens */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: SIDEBAR_WIDTH
          }
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export function LayoutHeader({ children }: { children: ReactNode }) {
  return <TopBar>{children}</TopBar>
}

export function LayoutContent({
  children,
  header
}: {
  children: ReactNode
  header?: ReactNode
}) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        backgroundColor: '#F9F9F9',
        minHeight: '100vh',
        overflowX: 'hidden'
      }}
    >
      {header}

      <Box sx={{ flexGrow: 1, p: 3 }}>{children}</Box>
    </Box>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarActionContext.Provider value={setIsSidebarOpen}>
        <SidebarStateContext.Provider value={isSidebarOpen}>
          {children}
        </SidebarStateContext.Provider>
      </SidebarActionContext.Provider>
    </Box>
  )
}
