import { MenuOutlined } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
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

const SIDEBAR_WIDTH = 240

const SidebarStateContext = createContext<boolean | null>(null)
const SidebarActionContext = createContext<Dispatch<
  SetStateAction<boolean>
> | null>(null)

export type SidebarLink = {
  link: string
  title: string
  icon: FunctionComponent
  exact?: boolean
}
export function LayoutSidebar({ links }: { links: SidebarLink[] }) {
  const router = useRouter()

  const isSidebarOpen = useContext(SidebarStateContext)
  const setIsSidebarOpen = useContext(SidebarActionContext)

  const isLinkActive = (path: string, exact: boolean = false) => {
    if (exact) return path === router.pathname
    return router.pathname.startsWith(path)
  }

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
        {links.map(({ link, title, icon: Icon, exact }) => (
          <ListItem key={link} disablePadding>
            <ListItemButton
              selected={isLinkActive(link, exact)}
              href={link}
              LinkComponent={Link}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
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
        minHeight: '100vh'
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
