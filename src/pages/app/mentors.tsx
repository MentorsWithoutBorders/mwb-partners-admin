import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { SxProps, Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import * as React from 'react'

import { fetchMentorsAPI } from '@/api/mentors'
import DataTable from '@/components/table/DataTable'
import { Column } from '@/components/table/interfaces'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'

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

const innerModalStyle: SxProps<Theme> = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

export default function MentorsPage() {
  const [openModal, setOpenModal] = React.useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)
  return (
    <DashboardLayout title="Mentors">
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={innerModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <DataTable
        openModal={handleOpenModal}
        fetchData={fetchMentorsAPI}
        columns={columns}
      />
    </DashboardLayout>
  )
}
