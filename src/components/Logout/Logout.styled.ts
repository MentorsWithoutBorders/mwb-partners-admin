import styled from '@emotion/styled'

export const LogoutContainer = styled.button(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: '#000000',
  border: `1px solid ${theme.palette.doveGray}`,
  width: '122px',
  height: '41px',
  fontSize: '14px',
  fontWeight: '500',
  fontFamily: theme.typography.fontFamily,
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '0 15px',
  cursor: 'pointer'
}))

export const LogoutIconContainer = styled.div({
  position: 'relative',
  width: '16px',
  height: '16px',
  rotate: '180deg'
})
