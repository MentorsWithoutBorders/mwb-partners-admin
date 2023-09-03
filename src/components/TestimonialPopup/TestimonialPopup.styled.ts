import styled from '@emotion/styled'
import Button from '../Button/Button'

export const TestimonialTrigger = styled(Button)(({ theme }) => ({
  fontSize: 16,
  textTransform: 'none',
  fontWeight: 500
}))

export const VideoWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  aspectRatio: 1.7,
  borderRadius: 10,
  overflow: 'hidden'
}))

export const TestimonialVideo = styled('iframe')(({ theme }) => ({
  width: '100%',
  height: '100%'
}))
