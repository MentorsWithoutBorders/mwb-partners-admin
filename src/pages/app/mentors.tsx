import Box from '@mui/material/Box'
import Image from 'next/image'
import { NextPage } from 'next/types'
import * as React from 'react'

import DashboardItem from '@/components/DashboardItem/DashboardItem'
import { DashboardItemsWrapper } from '@/components/DashboardItem/DashboardItem.styled'
import InputWithCheckboxes from '@/components/Input/InputWithCheckboxes/InputWithCheckboxes'
import ProjectsDropdown from '@/components/ProjectsDropdown/ProjectsDropdown'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import { useMentorStats } from '@/lib/mentors/mentors-client'
import {
  filterLeftMargin,
  flexContainer
} from '@/styles/pages/app/students.styled'
import { WithAuthentication } from '@/types/with-authentication/with-authentication.type'

const MentorsPage: WithAuthentication<NextPage> = () => {
  const [searchInput, setSearchInput] = React.useState('')
  const [searchCheckboxes, setSearchCheckboxes] = React.useState([
    true,
    false,
    false,
    false
  ])

  const { data, isLoading } = useMentorStats()

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
    </DashboardLayout>
  )
}

MentorsPage.requiresAuthentication = true

export default MentorsPage
