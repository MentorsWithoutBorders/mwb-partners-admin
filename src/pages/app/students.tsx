import ApartmentIcon from '@mui/icons-material/Apartment'
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import { useState } from 'react'

import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'

// TODO (#54): Use real data to populate the dropdown.
const items = [
  { id: 0, label: 'All centers' },
  { id: 1, label: 'Center A' },
  { id: 2, label: 'Center B' },
  { id: 3, label: 'Center C' }
]

const selectButtonStyle: SxProps<Theme> = {
  borderRadius: '15px',
  width: '300px'
}

const selectMenuStyle = {
  display: 'flex',
  alignItems: 'center'
}

const selectIconStyle: SxProps<Theme> = {
  marginRight: '10px'
}

export default function StudentsPage() {
  const [center, setCenter] = useState<number>(0)

  const handleCenterChange = (event: SelectChangeEvent<number>) => {
    setCenter(Number(event.target.value))
  }

  const centerMenuItems = items.map((item) => {
    const selected = item.id === center
    const visibilityStyle = selected ? { display: 'none' } : {}

    return (
      <MenuItem value={item.id} style={visibilityStyle} key={item.id}>
        <div style={selectMenuStyle}>
          {selected && <ApartmentIcon sx={selectIconStyle} />}
          <div>{item.label}</div>
        </div>
      </MenuItem>
    )
  })

  return (
    <DashboardLayout title="Students">
      <div>Students Page</div>

      <FormControl size="small">
        <Select
          value={center}
          onChange={handleCenterChange}
          sx={selectButtonStyle}
        >
          {centerMenuItems}
        </Select>
      </FormControl>
    </DashboardLayout>
  )
}
