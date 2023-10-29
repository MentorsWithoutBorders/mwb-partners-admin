import styled from '@emotion/styled'

import { StudentCertificationStatus } from '@/types/students/student.type'

export const StudentStatusText = styled.span<{
  status: StudentCertificationStatus
}>(({ theme, status }) => ({
  color:
    status === 'SENT'
      ? theme.palette.success!.main
      : status === 'IN_PROGRESS'
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
