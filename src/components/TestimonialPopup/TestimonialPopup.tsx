// components
import Popup from '../Popup/Popup'
import {
  TestimonialTrigger,
  TestimonialVideo,
  VideoWrapper
} from './TestimonialPopup.styled'
import YouTubeIcon from '@mui/icons-material/YouTube'

interface TestimonialPopupProps {
  title: string
  link: string
}

export default function TestimonialPopup({
  title,
  link
}: TestimonialPopupProps) {
  return (
    <Popup
      title={title}
      toggleElement={
        <TestimonialTrigger variant="contained" endIcon={<YouTubeIcon />}>
          {title}
        </TestimonialTrigger>
      }
      maxWidth={780}
    >
      <VideoWrapper>
        <TestimonialVideo
          src={link}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></TestimonialVideo>
      </VideoWrapper>
    </Popup>
  )
}
