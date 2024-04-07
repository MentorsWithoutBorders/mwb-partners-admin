import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams
} from '@mui/x-data-grid'

import { StudentStatusText, TestimonialsWrapper } from './StudentsTable.styled'

import Popup from '@/components/Popup/Popup'
import TestimonialPopup from '@/components/TestimonialPopup/TestimonialPopup'
import {
  StudentsSearchParams,
  useGetStudents
} from '@/lib/students/students-client'
import { Student } from '@/types/students/student.type'
import EyeIcon from '~/icons/eye.svg'
import UploadIcon from '~/icons/upload.svg'

const columns: GridColDef<Student>[] = [
  { field: 'name', headerName: 'Name', flex: 1, sortable: false },
  { field: 'email', headerName: 'Email', flex: 2, sortable: false },
  {
    field: 'phoneNumber',
    headerName: 'Whatsapp Number',
    flex: 1,
    sortable: false
  },
  {
    field: 'certificationStatus',
    headerName: 'Status',
    flex: 1,
    sortable: false,
    renderCell: (params) => (
      <StudentStatusText status={params.value}>
        {params.value}
      </StudentStatusText>
    )
  },
  {
    field: 'totalCoursesAttended',
    headerName: 'Courses',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'testimonials',
    headerName: 'Testimonials',
    type: 'actions',
    flex: 1,
    getActions: (params: GridRowParams<Student>) => [
      <GridActionsCellItem
        key="view"
        icon={
          <Popup
            title={`Video Testimonials ${params.row.name}`}
            maxWidth={700}
            toggleElement={<EyeIcon />}
          >
            <TestimonialsWrapper>
              {params.row.testimonials.map((testimonial) => (
                <TestimonialPopup
                  key={testimonial.url}
                  title={testimonial.uploadedDateTime}
                  link={testimonial.url}
                />
              ))}
              {params.row.testimonials.length < 1 && (
                <p>No testimonials found</p>
              )}
            </TestimonialsWrapper>
          </Popup>
        }
        label="View"
      />,
      <GridActionsCellItem
        key="upload"
        icon={<UploadIcon />}
        onClick={() => console.log('Upload Testimonials', params.id)}
        label="Upload"
      />
    ]
  }
]

export default function StudentsTable({
  filters
}: {
  filters: StudentsSearchParams
}) {
  const { data = [], isLoading } = useGetStudents(filters)

  return (
    <DataGrid loading={isLoading} rows={data} columns={columns} hideFooter />
  )
}
