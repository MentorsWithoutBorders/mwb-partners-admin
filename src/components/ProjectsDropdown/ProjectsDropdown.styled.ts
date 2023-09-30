import styled from '@emotion/styled'

import { StyledTextField } from '@/components/Input/TextField/TextField.styled'

export const Container = styled.div`
  width: 195px;
`

export const CreateProjectInput = styled(StyledTextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    margin: 0,
    fontSize: '14px',
    fontWeight: 500,
    width: '100%',
    padding: '10px',
    borderRadius: '10px',
    textAlign: 'left',
    border: `1px solid ${theme.palette.doveGray}`,
    color: theme.palette.text.primary,
    backgroundColor: 'white',
    position: 'relative'
  },

  marginBottom: 0
}))

export const IconContainer = styled.button`
  all: unset;
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
