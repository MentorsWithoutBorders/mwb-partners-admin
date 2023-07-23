import { Variant } from '@mui/material/styles/createTypography'
import NextLink from 'next/link'

import { StyledLink } from './Link.styled'

type LinkProps = {
  href?: string
  children: React.ReactNode
  variant?: Variant
}

export default function Link({ href, children, variant }: LinkProps) {
  return (
    <StyledLink href={href ?? '#'} component={NextLink} variant={variant}>
      {children}
    </StyledLink>
  )
}
