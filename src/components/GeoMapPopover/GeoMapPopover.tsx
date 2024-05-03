import CloseIcon from '@mui/icons-material/Close'
import YouTubeIcon from '@mui/icons-material/YouTube'
import React from 'react'

import Button from '../Button/Button'

import { StyledGeoMapPopover } from './GeoMapPopover.styled'

export interface IGeoMapPopoverDetails {
  country: string
  data: {
    org: {
      id: number | string
      url: string
      name: string
    }
    students: {
      id: number | string
      fullName: string
      videoUrl: string
      videoTitle: string
    }[]
  }[]
}

interface Props {
  close: () => void
  details: IGeoMapPopoverDetails
}

export default function GeoMapPopover({ details, close }: Props) {
  return (
    <StyledGeoMapPopover>
      <div className="header">
        <h3>{details.country}</h3>
        <CloseIcon onClick={close} className="close-icon" />
      </div>
      <div className="listing">
        {details.data.map((i) => (
          <div key={i.org.id} className="list-item">
            <a href={i.org.url} target="_blank">
              <div className="org-title">{i.org.name}</div>
            </a>
            <div className="student-list">
              {i.students.map((s) => (
                <div key={s.id} className="student-list-item">
                  <div className="student-name">{s.fullName}</div>
                  <a href={s.videoUrl} target="_blank">
                    <Button
                      size="small"
                      variant="contained"
                      endIcon={<YouTubeIcon />}
                      style={{
                        fontSize: '12px'
                      }}
                    >
                      {s.videoTitle}
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </StyledGeoMapPopover>
  )
}
