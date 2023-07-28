import ApartmentIcon from '@mui/icons-material/Apartment'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'

import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import {
  selectButtonStyle,
  selectIconStyle,
  selectMenuStyle
} from '@/styles/pages/app/students.styled'

// TODO (#54): Use real data to populate the dropdown.
const items = [
  { id: 0, label: 'All centers' },
  { id: 1, label: 'Center A' },
  { id: 2, label: 'Center B' },
  { id: 3, label: 'Center C' }
]

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
