import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import {
  SignUpFormContainer,
  SignUpLayoutContainer
} from './SignUpLayout.styled'

import SignUpForm from '@/components/Form/SignUp/SignUpForm'
import WelcomeBanner from '@/components/WelcomeBanner/WelcomeBanner'

export default function SignUpLayout() {
  return (
    <SignUpLayoutContainer container component="main">
      <Grid item xs={false} sm={6} md={6}>
        <WelcomeBanner />
      </Grid>
      <SignUpFormContainer
        item
        xs={12}
        sm={6}
        md={6}
        component={Paper}
        elevation={6}
        square
      >
        <SignUpForm />
      </SignUpFormContainer>
    </SignUpLayoutContainer>
  )
}
