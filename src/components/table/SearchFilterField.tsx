import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined'
import TuneIcon from '@mui/icons-material/Tune'
import Checkbox from '@mui/material/Checkbox'
import Fade from '@mui/material/Fade'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'

import {
  FilterOutlinedInput,
  FilterInputLabel
} from './FilterOutlinedInput.styled'

interface SearchFilterFieldProps {
  setSearchText: (searchText: string) => void
  setSearchBy: (searchBy: string) => void
  filterValues: string[]
  searchBy: string
}

export function SearchFilterField(props: SearchFilterFieldProps) {
  const { setSearchText, setSearchBy, filterValues, searchBy } = props

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    if (!event.target.checked) {
      setSearchBy('')
    } else {
      setSearchBy(value)
    }
  }

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value }
    } = event
    setSearchText(value)
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <FormControl>
      <FilterInputLabel htmlFor="search-filter">Search</FilterInputLabel>
      <FilterOutlinedInput
        onChange={handleSearchTextChange}
        id="search-filter"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              edge="end"
            >
              <TuneIcon />
            </IconButton>
            <Menu
              id="filter-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              onChange={handleFilterChange}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
            >
              {filterValues.map((filterValue) => (
                <MenuItem key={filterValue} value={filterValue}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchBy.indexOf(filterValue) > -1}
                        value={filterValue}
                        checkedIcon={<DisabledByDefaultOutlinedIcon />}
                        color="default"
                      />
                    }
                    label={filterValue}
                  />
                </MenuItem>
              ))}
            </Menu>
          </InputAdornment>
        }
        label="Search"
      />
    </FormControl>
  )
}
