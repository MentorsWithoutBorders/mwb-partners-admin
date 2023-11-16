import { YouTube } from '@mui/icons-material'
import {
  Box,
  Button,
  Unstable_Grid2 as Grid,
  Modal,
  Typography
} from '@mui/material'
import dayjs from 'dayjs'

import { MentorDetails } from '@/types/mentors/mentor.type'

function getCourseEndDate({
  startDate,
  duration,
  canceledDate
}: Pick<
  MentorDetails['courses'][number],
  'startDate' | 'duration' | 'canceledDate'
>) {
  if (canceledDate) return dayjs(canceledDate).format('ll')
  return dayjs(startDate).add(duration, 'months').format('ll')
}

export function MentorDetailsCourse({
  course
}: {
  course: MentorDetails['courses'][number]
}) {
  return (
    <div>
      <hr />

      <Grid container spacing={1} mb={1}>
        <Grid xs={12} sm={8}>
          <Typography variant="h6" fontWeight="bold" component="h3">
            {course.duration}-months course (
            {dayjs(course.startDate).format('ll')} - {getCourseEndDate(course)})
          </Typography>
        </Grid>
        <Grid xs={12} sm={4} display={['none', 'block']}>
          <Typography variant="subtitle1" fontWeight="bold">
            Video Testimonials
          </Typography>
        </Grid>
      </Grid>

      <Box mb={2}>
        <strong>Part of project:</strong> {course.project?.name || 'None'}
      </Box>

      <div>
        <Typography
          mb={1}
          fontStyle="italic"
          sx={{ textDecorationLine: 'underline' }}
        >
          Students:
        </Typography>
        {course.students.map((student) => (
          <Grid container key={student.id} spacing={1}>
            <Grid xs={12} sm={8} pl={[1, 2]}>
              {student.name}
            </Grid>
            <Grid xs={12} sm={4}>
              {student.testimonials.map((testimonial) => (
                <Button
                  key={testimonial.id}
                  href={testimonial.url}
                  target="_blank"
                  variant="contained"
                  size="small"
                  sx={{ textTransform: 'unset' }}
                  endIcon={<YouTube />}
                >
                  {dayjs(testimonial.uploadDate).format('ll')}
                </Button>
              ))}
            </Grid>
          </Grid>
        ))}
      </div>
    </div>
  )
}
