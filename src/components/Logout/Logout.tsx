import Image from 'next/image'

import { LogoutContainer, LogoutIconContainer } from './Logout.styled'

export default function Logout() {
  return (
    <LogoutContainer>
      <LogoutIconContainer>
        <Image src="/icons/logout.svg" alt="Logout" fill={true} />
      </LogoutIconContainer>
      Logout
    </LogoutContainer>
  )
}
