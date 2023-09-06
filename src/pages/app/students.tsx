import ApartmentIcon from '@mui/icons-material/Apartment'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { SelectChangeEvent } from '@mui/material/Select'
import { NextPage } from 'next/types'
import { useState } from 'react'

import InputWithCheckboxes from '@/components/Input/InputWithCheckboxes/InputWithCheckboxes'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import {
  filterLeftMargin,
  flexContainer,
  selectButtonStyle,
  selectIconStyle,
  selectMenuStyle
} from '@/styles/pages/app/students.styled'
import { WithAuthentication } from '@/types/with-authentication/with-authentication.type'

// TODO (#54): Use real data to populate the dropdown.
const items = [
  { id: 0, label: 'All centers' },
  { id: 1, label: 'Center A' },
  { id: 2, label: 'Center B' },
  { id: 3, label: 'Center C' }
]

const StudentsPage: WithAuthentication<NextPage> = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchCheckboxes, setSearchCheckboxes] = useState([true, false, false])
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

  return (
    <DashboardLayout title="Students">
      <div>Students Page</div>

      <Box sx={flexContainer}>
        <FormControl size="small">
          <Select
            value={center}
            onChange={handleCenterChange}
            sx={selectButtonStyle}
          >
            {centerMenuItems}
          </Select>
        </FormControl>

        <Box sx={filterLeftMargin}>
          <InputWithCheckboxes
            placeholder="Search"
            inputValue={searchInput}
            onInputChange={handleSearchInputChange}
            checkboxesLabels={['By name', 'By email', 'By status']}
            checkboxesValues={searchCheckboxes}
            onCheckboxesChange={setSearchCheckboxes}
            onMenuChange={handleSearchMenuChange}
          />
        </Box>
      </Box>
    </DashboardLayout>
  )
}

StudentsPage.requiresAuthentication = true

export default StudentsPage
