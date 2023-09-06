import PersonIcon from '@mui/icons-material/Person'
import { Box, Typography } from '@mui/material'

import {
  UserDetailsAvatar,
  UserDetailsContainer,
  UserDetailsName
} from './UserDetails.styled'

interface UserDetailsProps {
  name: string
  email: string
  avatar: string
}

export default function UserDetails({ name, email, avatar }: UserDetailsProps) {
  return (
    <UserDetailsContainer>
      <UserDetailsAvatar alt={name} src={avatar}>
        <PersonIcon />
      </UserDetailsAvatar>

      <Box>
        <UserDetailsName>{name}</UserDetailsName>

        <Typography>{email}</Typography>
      </Box>
    </UserDetailsContainer>
  )
}
