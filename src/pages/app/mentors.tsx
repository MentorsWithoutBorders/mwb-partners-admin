import ProjectsDropdown from '@/components/ProjectsDropdown/ProjectsDropdown'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'

export default function MentorsPage() {
  return (
    <DashboardLayout title="Mentors">
      <div>Mentors Page</div>

      <ProjectsDropdown />
    </DashboardLayout>
  )
}
