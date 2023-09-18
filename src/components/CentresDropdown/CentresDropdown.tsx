import ApartmentIcon from '@mui/icons-material/Apartment'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { SelectChangeEvent } from '@mui/material/Select'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import {
  selectButtonStyle,
  selectIconStyle,
  selectMenuStyle
} from './CentresDropdown.styled'

import { getCentresList } from '@/lib/centres/centres-client'
import { Centre } from '@/types/centre.type'

const ALL_CENTRES: Centre = {
  id: 0,
  name: 'All Centres',
  organization_id: null,
  address: null
}

export default function CentresDropdown({
  value,
  onChange
}: {
  value: Number
  onChange: Function
}) {
  const { data: session } = useSession()
  const [centres, setCentres] = useState<Array<Centre>>([ALL_CENTRES])

  useEffect(() => {
    const orgId: string | null = session?.user?.organization.id ?? null
    if (orgId && centres.length < 2) {
      getCentresList(orgId).then((list: Array<Centre>) =>
        setCentres(list.concat([ALL_CENTRES]))
      )
    }
  }, [centres, session])

  const handleChange = (event: SelectChangeEvent<Number>) => {
    onChange(Number(event.target.value))
  }

  const centreMenuItems = [ALL_CENTRES].concat(centres).map((item) => {
    const selected = item.id === value
    const visibilityStyle = selected ? { display: 'none' } : {}

    return (
      <MenuItem value={item.id} style={visibilityStyle} key={item.id}>
        <div style={selectMenuStyle}>
          {selected && <ApartmentIcon sx={selectIconStyle} />}
          <div>{item.name}</div>
        </div>
      </MenuItem>
    )
  })

  return (
    <FormControl size="small">
      <Select value={value} onChange={handleChange} sx={selectButtonStyle}>
        {centreMenuItems}
      </Select>
    </FormControl>
  )
}
