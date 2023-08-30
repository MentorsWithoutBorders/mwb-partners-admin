import { MapContainer as Map, TileLayer } from 'react-leaflet'
import { MapWrapper } from './DashboardMap.styled'

export default function DashboardMap() {
  return (
    <MapWrapper>
      <Map center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </Map>
    </MapWrapper>
  )
}
