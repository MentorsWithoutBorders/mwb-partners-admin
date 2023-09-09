import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { APIDataResponse } from './interfaces'
import { innerModalStyle } from './DataModal.styled'

interface DataModalProps {
  openModal: boolean
  handleClose: () => void
  title: string
  fetchData: (id: number) => APIDataResponse
  dataId: number | undefined
}

export default function DataModal(props: DataModalProps) {
  const { openModal, handleClose, title, fetchData, dataId } = props
  const [data, setData] = useState<APIDataResponse>()

  useEffect(() => {
    if (dataId) {
      setData(fetchData(dataId))
    }
  }, [fetchData, dataId])

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={innerModalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title} {dataId}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {JSON.stringify(data)}
        </Typography>
      </Box>
    </Modal>
  )
}
