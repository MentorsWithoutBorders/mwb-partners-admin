import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Controller, useForm } from 'react-hook-form'

import { SignInFormValue, signInFormSchema } from './SignInForm.schema'
import {
  StyledSignInFormAlert,
  StyledSignInFormButton,
  StyledSignInFormCheckboxContainer,
  StyledSignInFormLinkContainer,
  StyledSignInFormText,
  StyledSignInFormTitle,
  StyledSignInFormTitleContainer
} from './SignInForm.styled'

import TextField from '@/components/Input/TextField/TextField'
import Link from '@/components/Link/Link'
import { frontendRoutes } from '@/config/frontend/frontend-routes'
import { useSigninUser } from '@/lib/auth/auth-client'
import { theme } from '@/styles/theme'

export default function SignInForm() {
  const { error, trigger, isMutating } = useSigninUser()

  const onSubmit = async (values: SignInFormValue) => {
    const { email, password } = values

    await trigger({ email, password })
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<SignInFormValue>({
    resolver: yupResolver(signInFormSchema)
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
      <StyledSignInFormTitleContainer>
        <StyledSignInFormTitle component="h1" variant="h5">
          Sign in
        </StyledSignInFormTitle>
      </StyledSignInFormTitleContainer>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <StyledSignInFormAlert severity="error">
            {error.toString()}
          </StyledSignInFormAlert>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
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
          autoComplete="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message ?? null}
        />
        <StyledSignInFormCheckboxContainer container>
          <Grid item xs>
            <Controller
              name="rememberMe"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={
                    <StyledSignInFormText variant="body2">
                      Remember me
                    </StyledSignInFormText>
                  }
                />
              )}
            />
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </StyledSignInFormCheckboxContainer>
        <StyledSignInFormButton
          type="submit"
          disabled={isMutating}
          fullWidth
          variant="contained"
        >
          {isMutating ? 'Signing In...' : 'Sign In'}
        </StyledSignInFormButton>
        <StyledSignInFormLinkContainer container>
          <StyledSignInFormText variant="body2">
            {`Don't have an account?`}
          </StyledSignInFormText>
          <Link href={frontendRoutes.auth.signup} variant="body2">
            {'Sign up now'}
          </Link>
        </StyledSignInFormLinkContainer>
      </Box>
    </Box>
  )
}
