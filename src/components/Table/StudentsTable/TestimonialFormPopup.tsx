import { Alert } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'

import { TestimonialForm } from './StudentsTable.styled'

import Button from '@/components/Button/Button'
import InputWithCheckboxes from '@/components/Input/InputWithCheckboxes/InputWithCheckboxes'
import Popup from '@/components/Popup/Popup'
import UploadIcon from '~/icons/upload.svg'

interface Props {
  name: string
  id: unknown
}

export default function TestimonialFormPopup({ name, id }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSnackOpen, setIsSnackOpen] = useState(false)
  const [inputVal, setInputVal] = useState('')

  const onClose = () => {
    setIsOpen(false)
    setInputVal('')
    setIsSnackOpen(false)
  }

  const onSubmit = () => {
    // TODO: submit the form
    console.log('Submit Testimonial', inputVal)
    console.log('Submit Testimonial', id)
    setInputVal('')
    setIsSnackOpen(true)
  }

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value)
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
          onClick={() => console.log('Upload Testimonials', id)}
          label="Upload"
        />
      }
    >
      <TestimonialForm>
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
                onClick={onSubmit}
              >
                Upload
              </Button>
            </div>
          </>
        )}
      </TestimonialForm>
    </Popup>
  )
}
