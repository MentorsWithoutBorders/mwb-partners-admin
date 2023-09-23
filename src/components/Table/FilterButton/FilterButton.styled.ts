import styled from '@emotion/styled'
import { Button } from '@mui/material'

export const FilterButton = styled(Button)(({ theme }) => ({
  height: 32,
  border: '1px solid',
  borderRadius: 10,
  borderColor: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.main
}))
