import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useRouter } from 'next/router'

import { CenterStatusText } from './CentersTable.styled'

import { useGetCentresTable } from '@/lib/centres/centres-client'
import { CenterTableEntry } from '@/types/centre.type'

const columns: GridColDef<CenterTableEntry>[] = [
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

const useOpenExpenseModal = () => {
  const router = useRouter()

  return (centerId: string) => {
    router.push(
      `/app/centers/${centerId}/expenses?month=${new Date().getMonth()}&year=${new Date().getFullYear()}`
    )
  }
}

export default function CentersTable({
  searchString
}: {
  searchString: string
}) {
  const openModal = useOpenExpenseModal()
  const { data = [], isLoading } = useGetCentresTable(searchString)

  return (
    <DataGrid
      loading={isLoading}
      rows={data}
      columns={columns}
      hideFooter
      onRowClick={(r) => openModal(`${r.id}`)}
    />
  )
}
