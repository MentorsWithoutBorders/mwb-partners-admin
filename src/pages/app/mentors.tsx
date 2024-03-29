import Box from '@mui/material/Box'
import Image from 'next/image'
import { NextPage } from 'next/types'
import { type ChangeEvent, useState } from 'react'

import DashboardItem from '@/components/DashboardItem/DashboardItem'
import { DashboardItemsWrapper } from '@/components/DashboardItem/DashboardItem.styled'
import InputWithCheckboxes from '@/components/Input/InputWithCheckboxes/InputWithCheckboxes'
import ProjectsDropdown from '@/components/ProjectsDropdown/ProjectsDropdown'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import { MentorDetailsModal } from '@/containers/MentorDetails/MentorDetailsModal'
import MentorsTable from '@/containers/MentorsTable/MentorsTable'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { useGetMentorStats } from '@/lib/mentors/mentors-client'
import {
  filterLeftMargin,
  flexContainer
} from '@/styles/pages/app/students.styled'
import { WithAuthentication } from '@/types/with-authentication/with-authentication.type'

const MentorsPage: WithAuthentication<NextPage> = () => {
  const [searchInput, setSearchInput] = useState('')
  const searchCheckboxLabels = [
    'By name',
    'By email',
    'By student name',
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
    searchByStudent: searchCheckboxes[2],
    searchByStudentOrganization: searchCheckboxes[3]
  }
  const { data, isLoading } = useGetMentorStats(searchFilterParams)

  const stats = [
    {
      title: 'Total students',
      value: data?.students || 0,
      icon: '/icons/students.svg'
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
    },
    {
      title: 'Total mentors',
      value: data?.mentors || 0,
      icon: '/icons/mentors-blue.svg'
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

  // TODO properly implement download data for each page
  const downloadMentorsData = () => {
    console.log('Download mentors data')
  }

  return (
    <DashboardLayout title="Mentors">
      <Box sx={flexContainer}>
        <ProjectsDropdown />

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

      <MentorsTable filters={searchFilterParams} />

      <MentorDetailsModal />
    </DashboardLayout>
  )
}

MentorsPage.requiresAuthentication = true

export default MentorsPage
