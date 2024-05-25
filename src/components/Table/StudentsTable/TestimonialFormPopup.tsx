import { Alert } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'

import { TestimonialForm } from './StudentsTable.styled'

import Button from '@/components/Button/Button'
import InputWithCheckboxes from '@/components/Input/InputWithCheckboxes/InputWithCheckboxes'
import Popup from '@/components/Popup/Popup'
import { useUploadTestimonial } from '@/lib/students/students-client'
import UploadIcon from '~/icons/upload.svg'

interface Props {
  name: string
  id: unknown
}

export default function TestimonialFormPopup({ name, id }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSnackOpen, setIsSnackOpen] = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [err, setErr] = useState('')
  const uploadTestimonial = useUploadTestimonial()

  const onClose = () => {
    setIsOpen(false)
    setInputVal('')
    setIsSnackOpen(false)
    setErr('')
  }

  const onSubmit = (e: any) => {
    e.preventDefault()

    uploadTestimonial(id as string, inputVal)
      .then(() => {
        setInputVal('')
        setErr('')
        setIsSnackOpen(true)
      })
      .catch(() => {
        setErr('Failed to upload the testimonial')
      })
  }

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value)
    setErr('')
  }

  return (
    <Popup
      key="testimonials-popup"
      title={`Upload testimonial for ${name}`}
      maxWidth={700}
      onOpen={() => setIsOpen(true)}
      onClose={onClose}
      isOpen={isOpen}
      toggleElement={
        <GridActionsCellItem
          key="upload"
          icon={<UploadIcon />}
          label="Upload"
        />
      }
    >
      <TestimonialForm onSubmit={onSubmit}>
        {isSnackOpen ? (
          <Alert>Testimonial Saved Successfully!</Alert>
        ) : (
          <>
            <InputWithCheckboxes
              checkboxesLabels={[]}
              inputValue={inputVal}
              checkboxesValues={[]}
              placeholder="Paste YouTube link here"
              showEndAdornment={false}
              onInputChange={onInput}
              type="url"
              required
            />
            <div className="actions">
              <Button
                type="button"
                color="secondary"
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="success"
                variant="contained"
                sx={{ mt: 2 }}
              >
                Upload
              </Button>
            </div>
          </>
        )}
        {err && (
          <>
            <br />
            <Alert color="error">{err}</Alert>
          </>
        )}
      </TestimonialForm>
    </Popup>
  )
}
