import {
  MapContainer as Map,
  Marker,
  Popup,
  TileLayer,
  Tooltip
} from 'react-leaflet'
import Icon from '@mui/icons-material/LocationOn'
import {
  CenterPopupText,
  CenterPopupTitle,
  CenterTitle,
  MapWrapper,
  TestimonialWrapper
} from './DashboardMap.styled'
import 'leaflet/dist/leaflet.css'
import { Box } from '@mui/material'
import TestimonialPopup from '../TestimonialPopup/TestimonialPopup'

export default function DashboardMap() {
  return (
    <MapWrapper>
      <Map
        center={[40.505, 100.09]}
        zoom={2}
        style={{ height: '100vh', width: '100wh' }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {DUMMY_DATA.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.position.lat, marker.position.lng]}
          >
            <Popup>
              <CenterPopup title={marker.name} centers={marker.centers} />
            </Popup>
            <Tooltip>{marker.name}</Tooltip>
          </Marker>
        ))}
      </Map>
    </MapWrapper>
  )
}

const DUMMY_DATA = [
  {
    id: 'm1',
    name: 'Maximilian',
    places: 3,
    country: 'USA',
    position: {
      lat: 40.712776,
      lng: -74.005974
    },
    centers: [
      {
        name: 'New York',
        testimonials: [
          {
            name: 'John Doe',
            link: 'https://www.youtube.com/embed/mPZkdNFkNps'
          },
          {
            name: 'John Doe',
            link: 'https://www.youtube.com/embed/mPZkdNFkNps'
          }
        ]
      },
      {
        name: 'New York',
        testimonials: [
          {
            name: 'John Doe',
            link: 'https://www.youtube.com/embed/9bZkp7q19f0'
          },
          {
            name: 'John Doe',
            link: 'https://www.youtube.com/embed/9bZkp7q19f0'
          }
        ]
      }
    ]
  },
  {
    id: 'm2',
    name: 'Manuel',
    places: 1,
    country: 'Italy',
    position: {
      lat: 41.902782,
      lng: 12.496366
    },
    centers: [
      {
        name: 'New York',
        testimonials: [
          {
            name: 'John Doe',
            link: 'https://www.youtube.com/embed/mPZkdNFkNps'
          }
        ]
      },
      {
        name: 'New York',
        testimonials: [
          {
            name: 'John Doe',
            link: 'https://www.youtube.com/embed/mPZkdNFkNps'
          }
        ]
      }
    ]
  }
]

function CenterPopup({
  title,
  centers
}: {
  title: string
  centers: {
    name: string
    testimonials: {
      name: string
      link: string
    }[]
  }[]
}) {
  return (
    <Box>
      <CenterPopupTitle>{title}</CenterPopupTitle>

      {centers.map((center) => (
        <Box key={center.name}>
          <CenterTitle>{center.name}</CenterTitle>

          {center.testimonials.map((testimonial) => (
            <TestimonialWrapper key={testimonial.name}>
              <CenterPopupText>{testimonial.name}</CenterPopupText>

              <TestimonialPopup
                title={testimonial.name}
                link={testimonial.link}
              />
            </TestimonialWrapper>
          ))}
        </Box>
      ))}
    </Box>
  )
}
