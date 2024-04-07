import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import { useGetCentres } from '@/lib/centres/centres-client'

function CentersPage() {
  const { data: centers, isLoading } = useGetCentres()
  return (
    <DashboardLayout title="Centers">
      <div>
        {centers?.map((center) => (
          <div key={center.id}>center.name</div>
        ))}
      </div>
    </DashboardLayout>
  )
}

CentersPage.requiresAuthentication = true

export default CentersPage
