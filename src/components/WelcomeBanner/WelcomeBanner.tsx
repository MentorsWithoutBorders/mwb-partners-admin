import Image from 'next/image'

import {
  BrandTypography,
  ContentContainer,
  LogoContainer,
  WelcomeBannerContainer,
  WelcomeTypography
} from './WelcomeBanner.styled'

export default function WelcomeBanner() {
  return (
    <WelcomeBannerContainer display={{ xs: 'none', sm: 'flex' }}>
      <ContentContainer>
        <LogoContainer>
          <Image
            src="/mwb-icon-white.svg"
            alt="MWB Logo"
            width={126}
            height={131}
            priority
          />
        </LogoContainer>
        <WelcomeTypography>Welcome to</WelcomeTypography>
        <BrandTypography>Mentors Without Borders</BrandTypography>
      </ContentContainer>
    </WelcomeBannerContainer>
  )
}
