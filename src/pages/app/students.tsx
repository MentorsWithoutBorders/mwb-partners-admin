import Box from '@mui/material/Box'
import Image from 'next/image'
import { NextPage } from 'next/types'
import { ChangeEvent, useState } from 'react'

import CentresDropdown from '@/components/CentresDropdown/CentresDropdown'
import DashboardItem from '@/components/DashboardItem/DashboardItem'
import { DashboardItemsWrapper } from '@/components/DashboardItem/DashboardItem.styled'
import InputWithCheckboxes from '@/components/Input/InputWithCheckboxes/InputWithCheckboxes'
import StudentsTable from '@/components/Table/StudentsTable/StudentsTable'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { useGetStudentStats } from '@/lib/students/students-client'
import {
  filterLeftMargin,
  flexContainer
} from '@/styles/pages/app/students.styled'
import { WithAuthentication } from '@/types/with-authentication/with-authentication.type'

const StudentsPage: WithAuthentication<NextPage> = () => {
  const [searchInput, setSearchInput] = useState('')
  const [centre, setCentre] = useState<number>(0)

  const searchCheckboxLabels = [
    'By name',
    'By email',
    'By status',
    'By student organization'
  ]
  const [searchCheckboxes, setSearchCheckboxes] = useState([
    true,
    false,
    false,
    false
  ])

  const debouncedSearch = useDebounce(searchInput, 300)
  const searchFilterParams = {
    searchString: debouncedSearch,

    searchByName: searchCheckboxes[0],
    searchByEmail: searchCheckboxes[1],
    searchByStudentStatus: searchCheckboxes[2],
    searchByStudentOrganization: searchCheckboxes[3]
  }
  const { data, isLoading } = useGetStudentStats(searchFilterParams)

  const stats = [
    {
      title: 'Total students',
      value: data?.students || 0,
      icon: '/icons/students.svg'
    },
    {
      title: 'Total mentors',
      value: data?.mentors || 0,
      icon: '/icons/mentors-blue.svg'
    },
    {
      title: 'Total courses',
      value: data?.courses || 0,
      icon: '/icons/courses.svg'
    },
    {
      title: 'Total hours',
      value: data?.hours || 0,
      icon: '/icons/total-hours.svg'
    }
  ]

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

  const handleCentreChange = (newCentre: number) => {
    setCentre(newCentre)
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
            checkboxesLabels={searchCheckboxLabels}
            checkboxesValues={searchCheckboxes}
            onCheckboxesChange={setSearchCheckboxes}
            onMenuChange={handleSearchMenuChange}
          />
        </Box>
      </Box>

      <DashboardItemsWrapper $isLoading={isLoading} my={4}>
        {stats.map((item, index) => (
          <DashboardItem
            key={index}
            title={item.title}
            value={item.value}
            icon={
              <Image
                src={item.icon}
                width={25}
                height={25}
                alt={item.title}
                priority
              />
            }
          />
        ))}
      </DashboardItemsWrapper>

      <StudentsTable filters={searchFilterParams} />
    </DashboardLayout>
  )
}

StudentsPage.requiresAuthentication = true

export default StudentsPage
