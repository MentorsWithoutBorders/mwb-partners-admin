import { Box, MenuItem } from '@mui/material'
import * as React from 'react'

import { StyledProjectDropdown } from '@/components/Input/ProjectDropDown/ProjectDropDown.styled'

export default function ProjectDropDown(props: ProjectDropDownProps) {
  return (
    <StyledProjectDropdown defaultValue={'all-projects'}>
      <Box>
        <MenuItem value="create-new-project">+ Create new project</MenuItem>
        <hr />
        <MenuItem value="all-projects">All projects</MenuItem>)
        {props.data.map((f) => (
          <MenuItem key={f.value} value={f.value}>
            {f.title}
          </MenuItem>
        ))}
      </Box>
    </StyledProjectDropdown>
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
