import { SxProps, Theme } from '@mui/material/styles'

export const selectButtonStyle: SxProps<Theme> = {
  borderRadius: '15px',
  width: '300px'
}

export const selectIconStyle: SxProps<Theme> = {
  marginRight: '10px'
}

export const selectMenuStyle = {
  display: 'flex',
  alignItems: 'center'
}

export default {
  selectButtonStyle,
  selectIconStyle,
  selectMenuStyle
}
