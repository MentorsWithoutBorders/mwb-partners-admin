import { MenuOutlined } from '@mui/icons-material'

import DashboardItem from '@/components/DashboardItem'
import { DashboardLayout } from '@/containers/DashboardLayout'

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      <div>Dashboard Page</div>

      <DashboardItem title="Total Users" icon={<MenuOutlined />} value="20" />
    </DashboardLayout>
  )
}
