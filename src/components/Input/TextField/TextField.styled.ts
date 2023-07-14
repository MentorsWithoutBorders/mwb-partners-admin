import styled from '@emotion/styled'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.text?.primary,
  fontWeight: 500,
  fontSize: 16,
  marginBottom: theme.spacing(1)
}))

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    background: theme.palette.common?.white,
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19.5px',
    '+ fieldset': {
      borderRadius: '10px',
      borderWidth: '1px'
    },
    '&::placeholder': {
      color: theme.palette.text?.secondary
    }
  }
}))
