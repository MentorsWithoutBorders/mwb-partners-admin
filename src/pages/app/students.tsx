import Box from '@mui/material/Box'
import { NextPage } from 'next/types'
import { useState } from 'react'

import CentresDropdown from '@/components/CentresDropdown/CentresDropdown'
import InputWithCheckboxes from '@/components/Input/InputWithCheckboxes/InputWithCheckboxes'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import {
  filterLeftMargin,
  flexContainer
} from '@/styles/pages/app/students.styled'
import { WithAuthentication } from '@/types/with-authentication/with-authentication.type'
import StudentsTable from '@/components/Table/StudentsTable/StudentsTable'

const StudentsPage: WithAuthentication<NextPage> = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchCheckboxes, setSearchCheckboxes] = useState([true, false, false])
  const [centre, setCentre] = useState<number>(0)

  const handleCentreChange = (newCentre: number) => {
    setCentre(newCentre)
    // TODO: Should trigger search.
  }

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
        <CentresDropdown value={centre} onChange={handleCentreChange} />

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

      <StudentsTable />
    </DashboardLayout>
  )
}

// StudentsPage.requiresAuthentication = true

export default StudentsPage
