import { YouTube } from '@mui/icons-material'
import {
  Box,
  Button,
  Unstable_Grid2 as Grid,
  Modal,
  Typography
} from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import useMentorDetails from './hooks/useMentorDetails'

import BasicSelect from '@/components/Select/BasicSelect'
import { MentorDetails, PartnerProject } from '@/types/mentors/mentor.type'
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
const DUMMY_DATA: PartnerProject[] = [
  {
    id: '0',
    name: 'None'
  },
  {
    id: '1',
    name: 'Project 1'
  },
  {
    id: '2',
    name: 'Project 2'
  },
  {
    id: '3',
    name: 'Project 3'
  }
]

export function MentorDetailsCourse({
  course
}: {
  course: MentorDetails['courses'][number]
}) {
  const [createProject, setCreateProject] = useState<boolean>(false)
  const [selectedProject, setSelectedProject] = useState<string>('0')
  const [projects, setProjects] = useState<typeof DUMMY_DATA>(DUMMY_DATA)
  const { data } = useMentorDetails()
  useEffect(() => {
    if (course.project?.id && data?.length) {
      setProjects([...data])
      setSelectedProject(course.project?.id ?? '0')
    }
  }, [course.project?.id, data])

  const handleChange = (value: string) => {
    if (value === 'create') {
      setCreateProject(true)
    } else {
      setSelectedProject(value)
    }
  }

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

      <Box m={2} display={'flex'} alignItems={'center'} flexDirection={'row'}>
        <strong>Part of project:</strong>
        {/* {course.project?.name || 'None'} */}
        <div>
          <BasicSelect
            options={projects}
            value={selectedProject}
            handleChange={handleChange}
          />
        </div>
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
