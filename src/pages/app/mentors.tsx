import * as React from 'react'

import InputWithCheckboxes from '@/components/Input/InputWithCheckboxes/InputWithCheckboxes'
import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'

export default function MentorsPage() {
  const [filterValues, setFilterValues] = React.useState([])

  return (
    <DashboardLayout title="Mentors">
      <div>Mentors Page</div>

      <InputWithCheckboxes
        placeholder="Search"
        checkboxesLabels={[
          'By name',
          'By email',
          'By student name',
          'By student organization'
        ]}
      />
    </DashboardLayout>
  )
}
