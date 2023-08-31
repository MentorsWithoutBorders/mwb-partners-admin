import ApartmentIcon from '@mui/icons-material/Apartment'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'

import {
  selectButtonStyle,
  selectIconStyle,
  selectMenuStyle
} from './CentresDropdown.styled'

const DUMMY_DATA = [1, 2, 3].map((number) => ({
  id: number,
  name: `Centre ${number}`,
  organization_id: number,
  address: `Fake street ${number * 5}`
}))

const ALL_CENTRES = { id: 0, name: 'All Centres' }

export default function CentresDropdown({
  value,
  onChange
}: {
  value: Number
  onChange: Function
}) {
  const [centres, setCentres] = useState<typeof DUMMY_DATA>(DUMMY_DATA)

  const handleChange = (event: SelectChangeEvent<Number>) => {
    onChange(Number(event.target.value))
  }

  const centreMenuItems = [ALL_CENTRES].concat(centres).map((item) => {
    const selected = item.id === value
    const visibilityStyle = selected ? { display: 'none' } : {}

    return (
      <MenuItem value={item.id} style={visibilityStyle} key={item.id}>
        <div style={selectMenuStyle}>
          {selected && <ApartmentIcon sx={selectIconStyle} />}
          <div>{item.name}</div>
        </div>
      </MenuItem>
    )
  })

  return (
    <FormControl size="small">
      <Select value={value} onChange={handleChange} sx={selectButtonStyle}>
        {centreMenuItems}
      </Select>
    </FormControl>
  )
}
