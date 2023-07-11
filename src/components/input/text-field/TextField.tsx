import Box from '@mui/material/Box'
import { FilledInputProps } from '@mui/material/FilledInput'
import { InputProps } from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import { OutlinedInputProps } from '@mui/material/OutlinedInput'
import { SxProps, Theme } from '@mui/material/styles'
import MuiTextField, {
  TextFieldProps,
  TextFieldVariants
} from '@mui/material/TextField'

export function TextField<Variant extends TextFieldVariants>(
  props: {
    variant?: Variant
  } & Omit<TextFieldProps, 'variant'>
) {
  const { label, variant, ...rest } = props

  const labelStyle: SxProps<Theme> = {
    color: 'text.primary',
    fontWeight: 500,
    fontSize: 16,
    mb: 1
  }

  const inputProps:
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | Partial<InputProps>
    | undefined = {
    sx: {
      background: 'white',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '19.5px',
      fieldset: {
        borderRadius: '10px',
        borderWidth: '1px'
      },
      input: {
        '&::placeholder': {
          color: 'text.secondary'
        }
      }
    }
  }

  return (
    <Box sx={{ display: 'block' }}>
      <InputLabel sx={labelStyle}>{label}</InputLabel>
      <MuiTextField variant={variant} {...rest} InputProps={inputProps} />
    </Box>
  )
}
