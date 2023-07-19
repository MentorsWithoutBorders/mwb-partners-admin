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
  { value: 10, label: 'Ten' },
  { value: 20, label: 'Twenty' },
  { value: 30, label: 'Thirty' },
  { value: 40, label: 'Fourty' }
]

export default function StudentsPage() {
  const [age, setAge] = useState<number>(10)

  const handleChange = (event: SelectChangeEvent<number>) => {
    setAge(Number(event.target.value))
  }

  const menuItems = items.map((item) => {
    const selected = item.value === age
    const style = selected ? { display: 'none' } : {}

    return (
      <MenuItem value={item.value} style={style} key={item.value}>
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

      <FormControl fullWidth>
        <Select
          value={age}
          onChange={handleChange}
          style={{ borderRadius: '15px' }}
        >
          {menuItems}
        </Select>
      </FormControl>
    </DashboardLayout>
  )
}
