import Image from 'next/image'
import { signOut } from 'next-auth/react'

import { LogoutContainer, LogoutIconContainer } from './Logout.styled'

export default function Logout() {
  return (
    <LogoutContainer onClick={() => signOut()}>
      <LogoutIconContainer>
        <Image src="/icons/logout.svg" alt="Logout" fill={true} />
      </LogoutIconContainer>
      Logout
    </LogoutContainer>
  )
}
