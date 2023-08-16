import TuneIcon from '@mui/icons-material/Tune'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import Popper from '@mui/material/Popper'
import * as React from 'react'

import { popperContent, roundedInput } from './SearchInputWithFilters.styled'

const POPPER_ID = `input-filter-popper_${new Date().getTime()}`

function SearchInputWithFilters({
  filtersLabels,
  onInputChange,
  onMenuChange,
  onValuesChange,
  placeholder
}: {
  filtersLabels: Array<string>
  onInputChange?: Function
  onMenuChange?: Function
  onValuesChange?: Function
  placeholder?: string
}) {
  const inputRef = React.useRef(null)
  const [filtersValues, setFiltersValues] = React.useState(
    filtersLabels.map((label, index) => index === 0)
  )
  const [inputValue, setInputValue] = React.useState('')
  const [showPopperMenu, setShowPopperMenu] = React.useState(false)

  const handleIconBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    const newValue = !showPopperMenu

    setShowPopperMenu(newValue)
    if (onMenuChange) {
      onMenuChange(newValue)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = event.target.value

    setInputValue(newInput)
    if (onInputChange) {
      onInputChange(newInput)
    }
  }

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLElement>,
    index: number
  ) => {
    let newValues = [...filtersValues]
    newValues[index] = !filtersValues[index]

    setFiltersValues(newValues)
    if (onValuesChange) {
      onValuesChange(newValues)
    }
  }

  const popperId = showPopperMenu ? POPPER_ID : undefined

  const filtersElems = filtersLabels.map((label, index) => (
    <FormControlLabel
      control={
        <Checkbox
          checked={filtersValues[index]}
          onChange={(evt) => handleCheckboxChange(evt, index)}
        />
      }
      label={label}
      key={label}
    />
  ))

  return (
    <div>
      <OutlinedInput
        ref={inputRef}
        aria-describedby={popperId}
        size="small"
        placeholder={placeholder}
        sx={roundedInput}
        value={inputValue}
        onChange={handleInputChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleIconBtnClick}
              edge="end"
            >
              <TuneIcon color={showPopperMenu ? 'disabled' : 'action'} />
            </IconButton>
          </InputAdornment>
        }
      />

      <Popper
        id={popperId}
        open={showPopperMenu}
        anchorEl={inputRef.current}
        placement="bottom-start"
        modifiers={[
          {
            name: 'sameWidth',
            enabled: true,
            fn: ({ state }) => {
              state.styles.popper.width = `${state.rects.reference.width}px`
            },
            phase: 'beforeWrite',
            requires: ['computeStyles']
          }
        ]}
      >
        <Box sx={popperContent}>
          <FormGroup>{filtersElems}</FormGroup>
        </Box>
      </Popper>
    </div>
  )
}

export default SearchInputWithFilters
