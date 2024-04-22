import Box from '@mui/material/Box'
import { NextPage } from 'next/types'
import { ChangeEvent, useState } from 'react'

import InputWithCheckboxes from '@/components/Input/InputWithCheckboxes/InputWithCheckboxes'
import CentersTable from '@/components/Table/CentersTable/CentersTable'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { flexContainer } from '@/styles/pages/app/centers.styled'
import { WithAuthentication } from '@/types/with-authentication/with-authentication.type'

const CentersPage: WithAuthentication<NextPage> = () => {
  const [searchInput, setSearchInput] = useState('')
  const [centre, setCentre] = useState<number>(0)

  const searchCheckboxLabels = [
    'By name',
    'By country',
    'By manager',
    'By status'
  ]
  const [searchCheckboxes, setSearchCheckboxes] = useState([
    true,
    false,
    false,
    false
  ])

  const debouncedSearch = useDebounce(searchInput, 300)

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value)
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
    }
  }

  return (
    <DashboardLayout title="Centers">
      <div>Centers Page</div>
      <Box sx={flexContainer}>
        <InputWithCheckboxes
          placeholder="Search"
          inputValue={searchInput}
          onInputChange={handleSearchInputChange}
          checkboxesLabels={searchCheckboxLabels}
          checkboxesValues={searchCheckboxes}
          onCheckboxesChange={setSearchCheckboxes}
          onMenuChange={handleSearchMenuChange}
          showEndAdornment={false}
        />
      </Box>

      <CentersTable searchString={debouncedSearch} />
    </DashboardLayout>
  )
}

CentersPage.requiresAuthentication = true

export default CentersPage
