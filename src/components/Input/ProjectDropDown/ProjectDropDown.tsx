import { Box, MenuItem } from '@mui/material'
import * as React from 'react'

import DropDown from '@/components/Input/DropDown/DropDown'

export default function ProjectDropDown(props: ProjectDropDownProps) {
  return (
    <DropDown
      defaultValue={'all-projects'}
      sx={{
        '& .MuiList-root': { backgroundColor: 'green' }
      }}
    >
      <MenuItem value="create-new-project">+ Create new project</MenuItem>
      <hr />
      <MenuItem value="all-projects">All projects</MenuItem>)
      {props.data.map((f) => (
        <MenuItem key={f.value} value={f.value}>
          {f.title}
        </MenuItem>
      ))}
    </DropDown>
  )
}

interface ProjectDropDownProps {
  data: MenuItemProps[]
  onValueChange: (selectedValue: string) => void
}

interface MenuItemProps {
  value?: string
  title: string
}
