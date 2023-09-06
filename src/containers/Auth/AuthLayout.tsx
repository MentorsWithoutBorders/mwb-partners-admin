import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import { AuthFormContainer, AuthLayoutContainer } from './AuthLayout.styled'

import WelcomeBanner from '@/components/WelcomeBanner/WelcomeBanner'

type AuthLayoutProps = {
  children?: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <AuthLayoutContainer container component="main">
      <Grid item xs={false} sm={6} md={6}>
        <WelcomeBanner />
      </Grid>
      <AuthFormContainer
        item
        xs={12}
        sm={6}
        md={6}
        component={Paper}
        elevation={6}
        square
      >
        {children}
      </AuthFormContainer>
    </AuthLayoutContainer>
  )
}
