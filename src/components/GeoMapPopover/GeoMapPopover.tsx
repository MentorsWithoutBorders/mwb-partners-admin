import React from 'react'

export interface IGeoMapPopoverDetails {
  country: 'Georgia'
}

interface Props {
  close: () => void
  details: IGeoMapPopoverDetails
}

// TODO: for now this is just a template for map popover and need's to be finished
export default function GeoMapPopover({ details, close }: Props) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '5px'
      }}
    >
      Details: {details.country} <br />
      <button onClick={close}>Close</button>
    </div>
  )
}
