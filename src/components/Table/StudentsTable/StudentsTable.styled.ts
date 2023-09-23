import styled from '@emotion/styled'

import { StudentStatusType } from '@/types/students/table-types'

export const StudentStatusText = styled.span<{ status: StudentStatusType }>(
  ({ theme, status }) => ({
    color:
      status === 'Certificate sent'
        ? theme.palette.success!.main
        : status === 'In progress'
        ? theme.palette.warning!.main
        : theme.palette.error!.main,
    fontWeight: 500
  })
)

export const TestimonialContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px'
})
