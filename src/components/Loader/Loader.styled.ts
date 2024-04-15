import styled from '@emotion/styled'
import { Box } from '@mui/material'

import { theme } from '@/styles/theme'

export const StyledLoadingSpinner = styled(Box)(({}) => ({
  display: 'flex',
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '100%',
  height: '100%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: theme.palette.background.paper,
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0.5
})) as typeof Box
