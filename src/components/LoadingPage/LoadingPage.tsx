import CircularProgress from '@mui/material/CircularProgress'

import { StyledLoadingPageContainer } from './LoadingPage.styled'

export default function LoadingPage() {
  return (
    <StyledLoadingPageContainer>
      <CircularProgress />
    </StyledLoadingPageContainer>
  )
}
