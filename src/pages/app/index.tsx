import Image from 'next/image'

import DashboardItem from '@/components/DashboardItem/DashboardItem'
import { DashboardItemsWrapper } from '@/components/DashboardItem/DashboardItem.styled'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import { DownloadCsvForm } from '@/containers/DownloadCsvForm/DownloadCsvForm'
import dynamic from 'next/dynamic'

const DashboardMap = dynamic(
  () => import('@/components/DashboardMap/DashboardMap'),
  { ssr: false }
)

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

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      <DownloadCsvForm sx={{ mb: 4 }} />

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

      <DashboardMap />
    </DashboardLayout>
  )
}
