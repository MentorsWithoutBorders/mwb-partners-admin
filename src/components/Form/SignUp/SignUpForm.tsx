import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useForm } from 'react-hook-form'

import { SignUpFormValue, signUpFormSchema } from './SignUpForm.schema'
import {
  StyledSignUpFormButton,
  StyledSignUpFormLinkContainer,
  StyledSignUpFormText,
  StyledSignUpFormTitle,
  StyledSignUpFormTitleContainer
} from './SignUpForm.styled'

import TextField from '@/components/Input/TextField/TextField'
import Link from '@/components/Link/Link'
import { frontendRoutes } from '@/config/frontend/frontend-routes'
import { theme } from '@/styles/theme'

export default function SignUpForm() {
  const onSubmit = (values: SignUpFormValue) => {
    // TODO: backend integration
    console.log(values)
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormValue>({
    resolver: yupResolver(signUpFormSchema)
  })

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
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          autoComplete="given-name"
          autoFocus
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message ?? null}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          autoComplete="email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message ?? null}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message ?? null}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="confirm-password"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message ?? null}
        />
        <StyledSignUpFormButton type="submit" fullWidth variant="contained">
          Create account
        </StyledSignUpFormButton>
        <StyledSignUpFormLinkContainer container>
          <StyledSignUpFormText variant="body2">
            Already have an account?
          </StyledSignUpFormText>
          <Link href={frontendRoutes.auth.signin} variant="body2">
            {'Sign in'}
          </Link>
        </StyledSignUpFormLinkContainer>
      </Box>
    </Box>
  )
}
