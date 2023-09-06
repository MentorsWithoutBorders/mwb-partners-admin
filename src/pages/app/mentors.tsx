import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { SxProps, Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import * as React from 'react'

import { fetchMentorAPI, fetchMentorsAPI } from '@/api/mentors'
import DataModal from '@/components/table/DataModal'
import DataTable from '@/components/table/DataTable'
import { Column } from '@/components/table/interfaces'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import {
  filterLeftMargin,
  flexContainer
} from '@/styles/pages/app/students.styled'
import { WithAuthentication } from '@/types/with-authentication/with-authentication.type'

const MentorsPage: WithAuthentication<NextPage> = () => {
  const [searchInput, setSearchInput] = React.useState('')
  const [searchCheckboxes, setSearchCheckboxes] = React.useState([
    true,
    false,
    false,
    false
  ])

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value)
    // TODO: Should trigger search.
  }

  const handleSearchMenuChange = (isVisible: boolean) => {
    // Chekc if search menu was hidden.
    if (!isVisible) {
      // If all values are false, then set the first one a true.
      if (searchCheckboxes.indexOf(true) < 0) {
        const newValues = [...searchCheckboxes]
        newValues[0] = true
        setSearchCheckboxes(newValues)
      }

      // TODO: Should trigger search.
    }
  }

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  {
    id: 'courses',
    label: 'Courses',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'students',
    label: 'Students',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'hours',
    label: 'Hours',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toFixed(1)
  }
]

const filterValues = [
  'By name',
  'By email',
  'By student name',
  'By student organization'
]

export default function MentorsPage() {
  const [openModal, setOpenModal] = React.useState(false)
  const [dataId, setDataId] = React.useState<number>()
  const handleOpenModal = (id: number) => {
    setDataId(id)
    setOpenModal(true)
  }
  const handleClose = () => setOpenModal(false)

  // TODO properly implement download data for each page
  const downloadMentorsData = () => {
    console.log('Downlaod menthors Data')
  }
  return (
    <DashboardLayout title="Mentors">
      <DataModal
        openModal={openModal}
        handleClose={handleClose}
        title="Mentor Data"
        fetchData={fetchMentorAPI}
        dataId={dataId}
      />
      <DataTable
        openModal={handleOpenModal}
        downloadData={downloadMentorsData}
        fetchData={fetchMentorsAPI}
        columns={columns}
        filterValues={filterValues}
      />
    </DashboardLayout>
  )
}

MentorsPage.requiresAuthentication = true

export default MentorsPage
