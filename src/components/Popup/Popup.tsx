import { Backdrop } from '@mui/material'
import Popper from '@mui/material/Popper'
import * as React from 'react'

import { CloseButton, PopupBody, Title } from './Popup.styled'

interface IPopupProps {
  children: React.ReactNode
  toggleElement?: React.ReactNode
  maxWidth?: number
  title: string
}

export default function Popup({
  children,
  maxWidth,
  toggleElement,
  title
}: IPopupProps) {
  const [open, setOpen] = React.useState(false)

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setOpen(true)
  }

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    if (e.target !== e.currentTarget) return
    setOpen(false)
  }

  return (
    <>
      {toggleElement ? (
        React.cloneElement(toggleElement as React.ReactElement<any>, {
          onClick: handleOpen
        })
      ) : (
        <button type="button" onClick={handleOpen}>
          Toggle Popper
        </button>
      )}
      <Popper open={open} sx={{ zIndex: 9999 }}>
        <Backdrop open={true} onClick={handleClose as any}>
          <PopupBody maxWidth={maxWidth ?? 1170}>
            <CloseButton onClick={handleClose as any} />
            {title && <Title>{title}</Title>}
            {children}
          </PopupBody>
        </Backdrop>
      </Popper>
    </>
  )
}
