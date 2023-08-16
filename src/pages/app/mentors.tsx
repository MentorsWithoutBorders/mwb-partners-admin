import * as React from 'react'

import SearchInputWithFilters from '@/components/Input/SearchInputWithFilters/SearchInputWithFilters'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'

export default function MentorsPage() {
  const [filterValues, setFilterValues] = React.useState([])

  return (
    <DashboardLayout title="Mentors">
      <div>Mentors Page</div>

      <SearchInputWithFilters
        placeholder="Search"
        filtersLabels={[
          'By name',
          'By email',
          'By student name',
          'By student organization'
        ]}
      />
    </DashboardLayout>
  )
}
