import 'ol/ol.css'
import { Feature, Overlay, View } from 'ol'
import { Point } from 'ol/geom'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import Map from 'ol/Map.js'
import { fromLonLat } from 'ol/proj'
import { OSM } from 'ol/source'
import VectorSource from 'ol/source/Vector'
import Fill from 'ol/style/Fill'
import Icon from 'ol/style/Icon'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import Text from 'ol/style/Text'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { StyledGeoMap } from './GeoMap.styled'

export interface IGeoMapLocation<T> {
  lonLat: [number, number]
  details: T
  markerLabel: string
}

interface Props<T> {
  width?: string
  height?: string
  locations: IGeoMapLocation<T>[]
  popoverRenderer: ({
    details,
    close
  }: {
    details: T
    close: () => void
  }) => React.ReactNode
  center?: [number, number]
  zoom?: {
    onFocus?: number
    onBlur?: number
    default?: number
    duration?: number
  }
}

export default function GeoMap<T>({
  width = '100%',
  height = '200px',
  locations,
  popoverRenderer,
  center = [0, 0],
  zoom = {
    default: 2,
    duration: 500,
    onFocus: 2,
    onBlur: 2
  }
}: Props<T>) {
  const mapRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<Map | undefined>(undefined)
  const [mapOverlay, setMapOverlay] = useState<Overlay>()
  const [details, setDetails] = useState<T>()

  const closeOverlay = useCallback(() => {
    mapOverlay!.setPosition(undefined)

    map!.getView().animate({
      zoom: zoom.onBlur
    })

    setDetails(undefined)
  }, [map, mapOverlay, zoom.onBlur])

  const addMarkers = useCallback(() => {
    if (!map) {
      return
    }

    const popover = new Overlay({
      element: popoverRef.current!,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -50]
    })
    setMapOverlay(popover)
    map.addOverlay(popover)

    const vectorSource = new VectorSource()
    locations.forEach((location) => {
      const feature = new Feature({
        geometry: new Point(
          fromLonLat([location.lonLat[1], location.lonLat[0]])
        ),
        details: location.details
      })
      const markerStyle = new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: '/icons/geo-map-pin.svg'
        }),
        text: new Text({
          text: location.markerLabel,
          offsetY: -35,
          padding: [3, 2, 2, 5],
          font: 'bold 10px sans-serif',
          textAlign: 'center',
          backgroundStroke: new Stroke({
            color: 'black',
            width: 1
          }),
          backgroundFill: new Fill({
            color: 'white'
          })
        })
      })

      feature.setStyle(markerStyle)
      vectorSource.addFeature(feature)
    })

    const vectorLayer = new VectorLayer({
      source: vectorSource
    })

    map.addLayer(vectorLayer)

    map.on('click', (event) => {
      map.forEachFeatureAtPixel(event.pixel, (feature) => {
        if (feature) {
          const coordinates = feature.get('geometry').flatCoordinates

          map.getView().animate({
            center: coordinates,
            zoom: zoom.onFocus,
            duration: zoom.duration
          })

          popover.setPosition(coordinates)

          setDetails(feature.get('details') as T)
        }
      })
    })
  }, [locations, map, zoom.duration, zoom.onFocus])

  useEffect(() => {
    if (mapRef.current) {
      setMap((st) => {
        if (st) {
          return st
        }

        return new Map({
          target: mapRef.current!,
          layers: [
            new TileLayer({
              source: new OSM()
            })
          ],
          view: new View({
            center: center,
            zoom: zoom.default
          })
        })
      })
    }
  }, [center, zoom.default])

  useEffect(addMarkers, [addMarkers])

  return (
    <>
      <StyledGeoMap style={{ width, height }} ref={mapRef} />
      <div ref={popoverRef}>
        {details && popoverRenderer({ details, close: closeOverlay })}
      </div>
    </>
  )
}
