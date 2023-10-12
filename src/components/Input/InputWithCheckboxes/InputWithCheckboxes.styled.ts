import styled from '@emotion/styled'
import OutlinedInput from '@mui/material/OutlinedInput'
import { SxProps, Theme } from '@mui/material/styles'

export const roundedInput: SxProps<Theme> = {
  borderRadius: '15px'
}

export const popperContent: SxProps<Theme> = {
  bgcolor: 'background.paper',
  border: 1,
  borderColor: 'gray',
  borderRadius: '15px',
  marginTop: '8px',
  p: '4px'
}

export const StyledOutlineInput = styled(OutlinedInput)(({ theme }) => ({
  '&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
    border: '1px solid black'
  }
}))

const allStyles = {
  popperContent,
  roundedInput,
  StyledOutlineInput
}

export default allStyles
