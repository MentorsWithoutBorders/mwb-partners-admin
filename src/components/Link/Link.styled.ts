import styled from '@emotion/styled'
import { Link } from '@mui/material'

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontWeight: 500
})) as typeof Link
