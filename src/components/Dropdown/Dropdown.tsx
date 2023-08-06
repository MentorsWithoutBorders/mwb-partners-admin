import React from 'react'
import Select, { SelectProps, SelectRootSlotProps } from '@mui/base/Select'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { StyledButton, StyledListbox, StyledPopper } from './Dropdown.styled'

export const CustomDropdownButton = React.forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, ...other } = props
  return (
    <StyledButton type="button" {...other} ref={ref}>
      {other.children}

      <ExpandMoreIcon color="inherit" />
    </StyledButton>
  )
})

export const CommonDropdown = React.forwardRef(function CustomSelect<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const slots = {
    root: CustomDropdownButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots
  }

  return <Select {...props} ref={ref} slots={slots} />
})
