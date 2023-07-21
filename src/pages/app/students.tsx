import ApartmentIcon from '@mui/icons-material/Apartment'
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { useState } from 'react'

import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'

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
    const style = selected ? { display: 'none' } : {}

    return (
      <MenuItem value={item.id} style={style} key={item.id}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {selected && <ApartmentIcon style={{ marginRight: '10px' }} />}
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
          style={{ borderRadius: '15px', width: '300px' }}
        >
          {centerMenuItems}
        </Select>
      </FormControl>
    </DashboardLayout>
  )
}
