import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const WelcomeBannerContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary?.main,
  color: theme.palette.common.white,
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center'
}))

export const ContentContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  display: 'inline'
}))

export const LogoContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4)
}))

export const WelcomeTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 700,
  fontSize: '2.25rem'
}))

export const BrandTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 500,
  fontSize: '1.625rem'
}))
