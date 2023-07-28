import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export const PopupBody = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#ffffff',
  padding: '40px 30px',
  width: '95%',
  borderRadius: '20px',
  zIndex: 9999
}))

export const CloseButton = styled(CloseIcon)(({ theme }) => ({
  position: 'absolute',
  fill: theme.palette.nobel,
  width: '30px',
  height: '30px',
  top: '20px',
  right: '20px',
  cursor: 'pointer',
  '& path': {
    pointerEvents: 'none'
  }
}))

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: '25px',
  fontWeight: 500,
  textAlign: 'center',
  marginBottom: '30px'
}))
