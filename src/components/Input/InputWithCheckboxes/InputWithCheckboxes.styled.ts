import { SxProps, Theme } from '@mui/material/styles'

export const roundedInput: SxProps<Theme> = {
  borderRadius: '15px'
}

export const popperContent: SxProps<Theme> = {
  bgcolor: 'background.paper',
  border: 1,
  borderColor: 'gray',
  borderRadius: '15px',
  marginTop: '8px',
  p: '4px'
}

const allStyles = {
  popperContent,
  roundedInput
}

export default allStyles
