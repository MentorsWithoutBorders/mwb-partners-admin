import { Box, CircularProgress, Modal, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { MentorDetailsCourse } from './MentorDetailsCourse'

import { innerModalStyle } from '@/components/Table/DataModal/DataModal.styled'
import { useGetMentorDetails } from '@/lib/mentors/mentors-client'

const mentorDetailsModalTitle = 'mentor-details-modal-title'

function MentorDetailsModalContent({ mentorId }: { mentorId?: string }) {
  const {
    data: mentor,
    isLoading,
    error
  } = useGetMentorDetails(mentorId || null)

  if (isLoading) {
    return <CircularProgress sx={{ m: 'auto', display: 'block' }} />
  }

  if (!mentor || error) {
    return (
      <Typography color="red">
        {error.message || 'Failed to fetch mentor details!'}
      </Typography>
    )
  }

  return (
    <>
      <Typography
        id={mentorDetailsModalTitle}
        variant="h5"
        component="h2"
        textAlign="center"
        mb={[2, 2, 4]}
      >
        {mentor.name}
      </Typography>

      {!mentor.courses.length && <div>No courses found for this mentor!</div>}

      {mentor.courses.map((course) => (
        <MentorDetailsCourse key={course.id} course={course} />
      ))}
    </>
  )
}

export function MentorDetailsModal() {
  const router = useRouter()
  const { mentorId } = router.query as { mentorId?: string }

  const { data: mentor } = useGetMentorDetails(mentorId || null)

  return (
    <Modal
      aria-labelledby={mentorDetailsModalTitle}
      open={!!mentorId}
      onClose={() => router.push({ query: null })}
    >
      <Box sx={innerModalStyle}>
        <MentorDetailsModalContent mentorId={mentorId} />
      </Box>
    </Modal>
  )
}
