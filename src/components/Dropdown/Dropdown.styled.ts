import styled from '@emotion/styled'
import Option, { optionClasses } from '@mui/base/Option'
import Popper from '@mui/base/Popper'

export const StyledButton = styled('button')(
  ({ theme }) => `
    font-size: 14px;
    font-weight: 500;
    width: 100%;
    padding: 10px 10px;
    border-radius: 10px;
    text-align: left;
    border: 1px solid ${theme.palette.doveGray};
    color: ${theme.palette.text.primary};
    background-color: ${theme.palette.background.paper};
    position: relative;
    

    & > svg {
      font-size: 1.3rem;
      position: absolute;
      height: 100%;
      top: 0;
      right: 10px;
    }
    `
)

export const StyledListbox = styled('ul')(
  ({ theme }) => `
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    border-radius: 10px;
    overflow: auto;
    color: ${theme.palette.text.primary};
    background-color: ${theme.palette.background.paper};
    border: 1px solid ${theme.palette.doveGray};


    `
)

export const StyledOption = styled(Option)(
  ({ theme }) => `
    font-size: 14px;
    font-weight: 500;
    padding: 5px 10px;
    border-radius: 5px;
    
    &:not(:last-child) {
        margin-bottom: 5px;
    }

    &.${optionClasses.selected},  &:hover  {
        background-color: ${theme.palette.mariner};
        color: white;
    }
   
    `
)

export const StyledPopper = styled(Popper)(
  ({ theme }) => `
  z-index: 1;
  width: 100%;
  gap: 5px;
`
)
