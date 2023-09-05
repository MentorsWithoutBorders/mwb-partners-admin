import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const MapWrapper = styled(Box)(() => ({
  width: '100%',
  aspectRatio: 2,
  height: 500,
  // position: 'relative',
  overflow: 'hidden',
  borderRadius: 10,
  marginTop: 20
}))

export const CenterPopupTitle = styled(Typography)(() => ({
  fontSize: 14,
  fontWeight: 600,
  textDecoration: 'underline'
}))

export const CenterTitle = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  textDecoration: 'underline',
  color: theme.palette.boulder
}))

export const TestimonialWrapper = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 20
}))

export const CenterPopupText = styled(Typography)(({ theme }) => ({
  fontSize: 10,
  fontWeight: 500,
  color: theme.palette.boulder
}))
