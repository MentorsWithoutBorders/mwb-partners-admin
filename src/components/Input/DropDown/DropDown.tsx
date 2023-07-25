import { SelectProps } from '@mui/material'
import * as React from 'react'

import { StyledDropDown } from '@/components/Input/DropDown/Dropdown.styled'

export default function DropDown(props: SelectProps) {
  return (
    <StyledDropDown displayEmpty {...props}>
      {props.children}
    </StyledDropDown>
  )
}

interface DropdownProps {
  data: MenuItemProps[]
  onValueChange: (selectedValue: string) => void
}

interface MenuItemProps {
  value?: string
  title: string
}
