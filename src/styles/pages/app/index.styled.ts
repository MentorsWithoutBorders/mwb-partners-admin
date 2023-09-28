import { SxProps, Theme } from '@mui/material/styles'

export const flexContainer: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center'
}

export const toggleButton: SxProps<Theme> = {
  textDecoration: 'underline',
  textTransform: 'inherit'
}

const allStyles = {
  flexContainer,
  toggleButton
}

export default allStyles
