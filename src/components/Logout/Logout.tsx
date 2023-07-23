import { LogoutContainer, LogoutIconContainer } from './Logout.styled'
import Image from 'next/image'

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
