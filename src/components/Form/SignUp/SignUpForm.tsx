import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

import {
  StyledSignUpFormButton,
  StyledSignUpFormLinkContainer,
  StyledSignUpFormText,
  StyledSignUpFormTitle,
  StyledSignUpFormTitleContainer
} from './SignUpForm.styled'

import { TextField } from '@/components/Input/TextField/TextField'
import Link from '@/components/Link/Link'
import { theme } from '@/styles/theme'

export default function SignUpForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password')
    })
  }

  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true
  })

  return (
    <Box
      sx={{
        my: isMobile ? 8 : '20%',
        mx: isMobile ? 4 : '20%'
      }}
    >
      <StyledSignUpFormTitleContainer>
        <StyledSignUpFormTitle component="h1" variant="h5">
          Sign up
        </StyledSignUpFormTitle>
      </StyledSignUpFormTitleContainer>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
        />
        <StyledSignUpFormButton type="submit" fullWidth variant="contained">
          Create account
        </StyledSignUpFormButton>
        <StyledSignUpFormLinkContainer container>
          <StyledSignUpFormText variant="body2">
            Already have an account?
          </StyledSignUpFormText>
          <Link href="/signin" variant="body2">
            {'Sign in'}
          </Link>
        </StyledSignUpFormLinkContainer>
      </Box>
    </Box>
  )
}
