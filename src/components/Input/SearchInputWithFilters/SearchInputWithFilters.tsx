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

const POPPER_ID = `input-filter-popper=${new Date().getTime()}`

function SearchInputWithFilters({ placeholder }: { placeholder: string }) {
  const inputRef = React.useRef(null)
  const [showPopperMenu, setShowPopperMenu] = React.useState(false)

  const handleIconBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    setShowPopperMenu((show) => !show)
  }

  const popperId = showPopperMenu ? POPPER_ID : undefined

  return (
    <div>
      <OutlinedInput
        ref={inputRef}
        aria-describedby={popperId}
        size="small"
        placeholder={placeholder}
        sx={roundedInput}
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
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="By name" />
            <FormControlLabel control={<Checkbox />} label="By email" />
            <FormControlLabel control={<Checkbox />} label="By student name" />
            <FormControlLabel
              control={<Checkbox />}
              label="By student organization"
            />
          </FormGroup>
        </Box>
      </Popper>
    </div>
  )
}

export default SearchInputWithFilters
