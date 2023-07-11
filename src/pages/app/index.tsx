import { MenuOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'

import DashboardItem from '@/components/DashboardItem'
import { DashboardLayout } from '@/containers/DashboardLayout'

const SAMPLE_DATA = [
  {
    title: 'Total students',
    value: '20',
    icon: <MenuOutlined />
  },
  {
    title: 'Total courses',
    value: '3',
    icon: <MenuOutlined />
  },
  {
    title: 'Total hours',
    value: '32',
    icon: <MenuOutlined />
  },
  {
    title: 'Total mentors',
    value: '20',
    icon: <MenuOutlined />
  }
]

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      <div>Dashboard Page</div>

      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          padding: '20px',
          backgroundColor: '#E0E8F8',
          borderRadius: '10px',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {SAMPLE_DATA.map((item, index) => (
          <DashboardItem
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </Box>
    </DashboardLayout>
  )
}
