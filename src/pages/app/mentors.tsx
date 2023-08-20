import Box from '@mui/material/Box'
import * as React from 'react'

import InputWithCheckboxes from '@/components/Input/InputWithCheckboxes/InputWithCheckboxes'
import ProjectsDropdown from '@/components/ProjectsDropdown/ProjectsDropdown'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import {
  filterLeftMargin,
  flexContainer
} from '@/styles/pages/app/students.styled'

export default function MentorsPage() {
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

  return (
    <DashboardLayout title="Mentors">
      <div>Mentors Page</div>

      <Box sx={flexContainer}>
        <ProjectsDropdown />

        <Box sx={filterLeftMargin}>
          <InputWithCheckboxes
            placeholder="Search"
            inputValue={searchInput}
            onInputChange={handleSearchInputChange}
            checkboxesLabels={[
              'By name',
              'By email',
              'By student name',
              'By student organization'
            ]}
            checkboxesValues={searchCheckboxes}
            onCheckboxesChange={setSearchCheckboxes}
            onMenuChange={handleSearchMenuChange}
          />
        </Box>
      </Box>
    </DashboardLayout>
  )
}
