import { Select, SelectProps } from '@mui/material'
import * as React from 'react'

export default function DropDown(props: SelectProps) {
  return (
    <Select displayEmpty {...props}>
      {props.children}
    </Select>
  )
}
