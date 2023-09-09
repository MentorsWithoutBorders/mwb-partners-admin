import { SxProps, Theme } from '@mui/material'

export const tablePaperStyle: SxProps<Theme> = {
  borderRadius: 6,
  borderColor: '#a29898',
  borderStyle: 'solid',
  borderWidth: 1,
  fontSize: 16,
  width: '100%',
  overflow: 'hidden'
}

export const tableThStyle: SxProps<Theme> = {
  borderWidth: 0,
  borderBottomWidth: 1,
  borderStyle: 'solid',
  borderColor: '#a29898'
}

export const tableTdsStyle: SxProps<Theme> = {
  borderWidth: 0,
  fontSize: 16
}
