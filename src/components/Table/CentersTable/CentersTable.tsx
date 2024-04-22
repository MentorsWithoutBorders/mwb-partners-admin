import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams
} from '@mui/x-data-grid'

import { CenterStatusText, TestimonialsWrapper } from './CentersTable.styled'

import Popup from '@/components/Popup/Popup'
import TestimonialPopup from '@/components/TestimonialPopup/TestimonialPopup'
import { useGetCentresTable } from '@/lib/centres/centres-client'
import {
  StudentsSearchParams,
  useGetStudents
} from '@/lib/students/students-client'
import { Centre } from '@/types/centre.type'
import { Student } from '@/types/students/student.type'
import EyeIcon from '~/icons/eye.svg'
import UploadIcon from '~/icons/upload.svg'

const columns: GridColDef<Centre>[] = [
  { field: 'name', headerName: 'Name', flex: 2, sortable: false },
  { field: 'country', headerName: 'Country', flex: 2, sortable: false },
  { field: 'manager', headerName: 'Manager', flex: 2, sortable: false },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    sortable: false,
    renderCell: (params) => (
      <CenterStatusText status={params.value}>{params.value}</CenterStatusText>
    )
  }
]

export default function CentersTable({
  searchString
}: {
  searchString: string
}) {
  const { data = [], isLoading } = useGetCentresTable(searchString)

  return (
    <DataGrid loading={isLoading} rows={data} columns={columns} hideFooter />
  )
}
