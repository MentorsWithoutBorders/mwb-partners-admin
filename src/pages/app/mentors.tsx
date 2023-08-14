import TuneIcon from '@mui/icons-material/Tune'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import Popper from '@mui/material/Popper'
// import TextField from '@mui/material/TextField'
import * as React from 'react'

import { DashboardLayout } from '@/containers/dashboard/DashboardLayout'
import { popperContent, roundedInput } from '@/styles/pages/app/mentors.styled'

export default function MentorsPage() {
  const myRef = React.useRef(null)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setShowPassword((show) => !show)
  }

  // const open = Boolean(anchorEl);
  const id = showPassword ? 'simple-popper' : undefined

  return (
    <DashboardLayout title="Mentors">
      <div>Mentors Page</div>

      <div>
        <OutlinedInput
          ref={myRef}
          aria-describedby={id}
          size="small"
          placeholder="Search"
          sx={roundedInput}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClick}
                edge="end"
              >
                <TuneIcon color={showPassword ? 'disabled' : 'action'} />
              </IconButton>
            </InputAdornment>
          }
        />

        <Popper
          id={id}
          open={showPassword}
          anchorEl={myRef.current}
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
              <FormControlLabel
                control={<Checkbox />}
                label="By student name"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="By student organization"
              />
            </FormGroup>
          </Box>
        </Popper>
      </div>
    </DashboardLayout>
  )
}
