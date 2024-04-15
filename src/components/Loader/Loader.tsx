import { Box, CircularProgress } from '@mui/material'

import { StyledLoadingSpinner } from './Loader.styled'

export default function Loader({
  children,
  isLoading
}: React.PropsWithChildren<{ isLoading: boolean }>) {
  return (
    <Box height={'100%'} width={'100%'} position={'relative'}>
      {children}
      {isLoading && (
        <StyledLoadingSpinner>
          <CircularProgress />
        </StyledLoadingSpinner>
      )}
    </Box>
  )
}
