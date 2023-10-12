import ClickAwayListener from '@mui/base/ClickAwayListener'
import TuneIcon from '@mui/icons-material/Tune'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Popper from '@mui/material/Popper'
import * as React from 'react'

import {
  StyledOutlineInput,
  popperContent,
  roundedInput
} from './InputWithCheckboxes.styled'

const POPPER_ID = `input-filter-popper_${new Date().getTime()}`

function InputWithCheckboxes({
  checkboxesLabels,
  checkboxesValues,
  inputValue,
  onCheckboxesChange,
  onInputChange,
  onMenuChange,
  placeholder
}: {
  checkboxesLabels: Array<string>
  checkboxesValues: Array<boolean>
  inputValue: String
  onCheckboxesChange?: Function
  onInputChange?: Function
  onMenuChange?: Function
  placeholder?: string
}) {
  const inputRef = React.useRef(null)
  const [showPopperMenu, setShowPopperMenu] = React.useState(false)

  const handleIconBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    const isVisible = !showPopperMenu
    setShowPopperMenu(isVisible)

    if (onMenuChange) {
      onMenuChange(isVisible)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onInputChange) {
      onInputChange(event)
    }
  }

  const handlePopperClickAway = () => {
    setShowPopperMenu(false)
  }

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLElement>,
    index: number
  ) => {
    if (onCheckboxesChange) {
      let newValues = [...checkboxesValues]
      newValues[index] = !checkboxesValues[index]
      onCheckboxesChange(newValues)
    }
  }

  const handleEscKey = (event: any) => {
    if (event.key === 'Escape') {
      setShowPopperMenu(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleEscKey)
    return () => {
      window.removeEventListener('keydown', handleEscKey)
    }
  }, [])

  const popperId = showPopperMenu ? POPPER_ID : undefined

  const filtersElems = checkboxesLabels.map((label, index) => (
    <FormControlLabel
      control={
        <Checkbox
          checked={checkboxesValues[index]}
          onChange={(evt) => handleCheckboxChange(evt, index)}
        />
      }
      label={label}
      key={label}
    />
  ))

  return (
    <ClickAwayListener onClickAway={handlePopperClickAway}>
      <div>
        <StyledOutlineInput
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
                aria-label="toggle menu visibility"
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
    </ClickAwayListener>
  )
}

export default InputWithCheckboxes
