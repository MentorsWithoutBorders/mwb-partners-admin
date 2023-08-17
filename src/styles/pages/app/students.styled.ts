import { SxProps, Theme } from '@mui/material/styles'

export const filterLeftMargin: SxProps<Theme> = {
  marginLeft: '20px'
}

export const flexContainer: SxProps<Theme> = {
  display: 'flex'
}

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

const allStyles = {
  filterLeftMargin,
  flexContainer,
  selectButtonStyle,
  selectIconStyle,
  selectMenuStyle
}

export default allStyles
