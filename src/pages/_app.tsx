import '@/styles/globals.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { AppType } from 'next/app'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig, SWRConfiguration } from 'swr'

import AuthGuard from '@/containers/AuthGuard/AuthGuard'
import { client } from '@/lib/api-client'
import { theme } from '@/styles/theme'
import { WithAuthentication } from '@/types/with-authentication/with-authentication.type'

type ComponentWithAuthentication<P> = P & {
  Component: WithAuthentication
}

const swrDefaultConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  keepPreviousData: true,
  fetcher: (path) => client(path)
}

const App: AppType<{ session: Session | null }> = (props) => {
  const {
    Component,
    pageProps: { session, ...pageProps }
  } = props as ComponentWithAuthentication<typeof props>

  const requiresAuthentication = Component.requiresAuthentication

  return (
    <SWRConfig value={swrDefaultConfig}>
      <SessionProvider session={session}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthGuard requiresAuthentication={requiresAuthentication}>
              <Component {...pageProps} />
            </AuthGuard>
          </ThemeProvider>
        </LocalizationProvider>
      </SessionProvider>
    </SWRConfig>
  )
}

export default App
