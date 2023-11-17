import { SxProps, Theme } from '@mui/material'

export const innerModalStyle: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100% - 1rem)',
  maxWidth: '1100px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '2rem',
  p: [4, 4, 8]
}
