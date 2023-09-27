import { Box } from '@mui/material'
import Image from 'next/image'
import { NextPage } from 'next/types'
import { useState } from 'react'

import Button from '@/components/Button/Button'
import DashboardItem from '@/components/DashboardItem/DashboardItem'
import { DashboardItemsWrapper } from '@/components/DashboardItem/DashboardItem.styled'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import { DownloadCsvForm } from '@/containers/DownloadCsvForm/DownloadCsvForm'
import { flexContainer, toggleButton } from '@/styles/pages/app/index.styled'
import { WithAuthentication } from '@/types/with-authentication/with-authentication.type'

const SAMPLE_DATA = [
  {
    title: 'Total students',
    value: '20',
    icon: './icons/students.svg'
  },
  {
    title: 'Total courses',
    value: '3',
    icon: './icons/courses.svg'
  },
  {
    title: 'Total hours',
    value: '32',
    icon: './icons/total-hours.svg'
  },
  {
    title: 'Total mentors',
    value: '20',
    icon: './icons/mentors-blue.svg'
  }
]

const DashboardPage: WithAuthentication<NextPage> = () => {
  const [allParticipants, setAllParticipants] = useState<boolean>(false)

  const toggleAllParticipants = () => {
    setAllParticipants(!allParticipants)
    // TODO: Should re-trigger search.
  }

  return (
    <DashboardLayout title="Dashboard">
      <Box sx={{ ...flexContainer, mb: 4 }}>
        <DownloadCsvForm />

        <Button
          onClick={toggleAllParticipants}
          type="button"
          variant="text"
          color="primary"
          sx={{ ...toggleButton, ml: 2 }}
        >
          Switch to{' '}
          {allParticipants ? 'own organization' : 'all MWB participants'}
        </Button>
      </Box>

      <DashboardItemsWrapper>
        {SAMPLE_DATA.map((item, index) => (
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

DashboardPage.requiresAuthentication = true

export default DashboardPage
