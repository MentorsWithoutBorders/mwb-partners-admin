import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams
} from '@mui/x-data-grid'
import { useRouter } from 'next/router'

import {
  MentorsSearchParams,
  useGetMentors
} from '@/lib/mentors/mentors-client'
import { Mentor } from '@/types/mentors/mentor.type'
import InfoIcon from '~/icons/info-details.svg'

function MentorDetailsAction({ mentorId }: { mentorId: string }) {
  const router = useRouter()
  return (
    <GridActionsCellItem
      icon={<InfoIcon />}
      onClick={() => router.push({ query: { mentorId } })}
      label="Details"
    />
  )
}

const columns: GridColDef<Mentor>[] = [
  { field: 'name', headerName: 'Name', flex: 2, sortable: false },
  { field: 'email', headerName: 'Email', flex: 3, sortable: false },
  {
    field: 'courses',
    headerName: 'Courses',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'students',
    headerName: 'Students',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'hours',
    headerName: 'Hours',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'actions',
    headerName: 'Details',
    type: 'actions',
    flex: 1,
    getActions: ({ row }: GridRowParams<Mentor>) => [
      <MentorDetailsAction key="details" mentorId={row.id} />
    ]
  }
]

export default function MentorsTable({
  filters
}: {
  filters: MentorsSearchParams
}) {
  const { data = [], isLoading } = useGetMentors(filters)

  return (
    <DataGrid loading={isLoading} rows={data} columns={columns} hideFooter />
  )
}
