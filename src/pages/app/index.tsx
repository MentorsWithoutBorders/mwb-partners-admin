import { Box } from '@mui/material'
import Image from 'next/image'
import { NextPage } from 'next/types'
import { useState } from 'react'

import Button from '@/components/Button/Button'
import DashboardItem from '@/components/DashboardItem/DashboardItem'
import { DashboardItemsWrapper } from '@/components/DashboardItem/DashboardItem.styled'
import GeoMap, { IGeoMapLocation } from '@/components/GeoMap/GeoMap'
import GeoMapPopover, {
  IGeoMapPopoverDetails
} from '@/components/GeoMapPopover/GeoMapPopover'
import LoadingPage from '@/components/LoadingPage/LoadingPage'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import { DownloadCsvForm } from '@/containers/DownloadCsvForm/DownloadCsvForm'
import {
  NgoStatsCount,
  useGetDashboardDetails
} from '@/lib/dashboard/dashboard-client'
import { flexContainer, toggleButton } from '@/styles/pages/app/index.styled'
import { WithAuthentication } from '@/types/with-authentication/with-authentication.type'

const SAMPLE_DATA = [
  {
    title: 'Total students',
    value: '20',
    itemName: 'totalStudents',
    icon: './icons/students.svg'
  },
  {
    title: 'Total courses',
    value: '3',
    itemName: 'totalCourses',
    icon: './icons/courses.svg'
  },
  {
    title: 'Total hours',
    value: '32',
    itemName: 'totalHours',
    icon: './icons/total-hours.svg'
  },
  {
    title: 'Total mentors',
    value: '20',
    itemName: 'totalMentors',
    icon: './icons/mentors-blue.svg'
  }
]

const SAMPLE_LOCATION_DATA = [
  {
    org: {
      id: 1,
      name: 'Education for All Children',
      url: 'https://google.com'
    },
    students: [
      {
        id: 1,
        fullName: 'John Doe',
        videoUrl: 'https://youtube.com',
        videoTitle: 'Testimonial'
      },
      {
        id: 2,
        fullName: 'Jane Doe',
        videoUrl: 'https://youtube.com',
        videoTitle: 'Testimonial'
      }
    ]
  },
  {
    org: {
      id: 2,
      name: 'The Leo Project',
      url: 'https://google.com'
    },
    students: [
      {
        id: 3,
        fullName: 'John Doe',
        videoUrl: 'https://youtube.com',
        videoTitle: 'Testimonial'
      },
      {
        id: 4,
        fullName: 'Jane Doe',
        videoUrl: 'https://youtube.com',
        videoTitle: 'Testimonial'
      }
    ]
  }
]

const SAMPLE_LOCATIONS = [
  {
    lonLat: [41.68832658348843, 44.811985973507895],
    markerLabel: '120',
    details: {
      country: 'Georgia',
      data: SAMPLE_LOCATION_DATA
    }
  },
  {
    lonLat: [41.91091088009691, 12.453041129607207],
    markerLabel: '20',
    details: {
      country: 'Italy',
      data: SAMPLE_LOCATION_DATA
    }
  },
  {
    lonLat: [40.40910810436468, -3.7109913179473026],
    markerLabel: '110',
    details: {
      country: 'Spain',
      data: SAMPLE_LOCATION_DATA
    }
  },
  {
    lonLat: [-1.333412007165954, 36.714870832750265],
    markerLabel: '55',
    details: {
      country: 'Kenia',
      data: SAMPLE_LOCATION_DATA
    }
  }
] as IGeoMapLocation<IGeoMapPopoverDetails>[]

const DashboardPage: WithAuthentication<NextPage> = () => {
  const [allParticipants, setAllParticipants] = useState<boolean>(false)

  const toggleAllParticipants = () => {
    setAllParticipants(!allParticipants)
    // TODO: Should re-trigger search.
  }

  const { data, isLoading } = useGetDashboardDetails(allParticipants)

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

      {isLoading ? (
        <LoadingPage />
      ) : (
        <DashboardItemsWrapper>
          {data?.ngoStats &&
            SAMPLE_DATA.map((item, index) => (
              <DashboardItem
                key={index}
                title={item.title}
                value={
                  data?.ngoStats[item.itemName as keyof NgoStatsCount] ?? 0
                }
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

          <br />
          <GeoMap
            height="600px"
            popoverRenderer={GeoMapPopover}
            locations={SAMPLE_LOCATIONS}
          />
        </DashboardItemsWrapper>
      )}
    </DashboardLayout>
  )
}

DashboardPage.requiresAuthentication = true

export default DashboardPage
