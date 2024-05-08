import styled from '@emotion/styled'

import { CenterStatus } from '@/types/centre.type'

export const CenterStatusText = styled.span<{
  status: CenterStatus
}>(({ theme, status }) => ({
  color:
    status === 'Up to date'
      ? theme.palette.success!.main
      : status === 'In progress'
      ? theme.palette.warning!.main
      : theme.palette.error!.main,
  fontWeight: 500
}))

export const TestimonialsWrapper = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'center'
}))
