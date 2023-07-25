/* eslint-disable prettier/prettier */
import styled from '@emotion/styled'
import { MenuItem, Select } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'

import DropDown from '@/components/Input/DropDown/DropDown'

// export const StyledProjectDropdown = styled(DropDown)`
//   color: theme.palette.text?.primary;
//   font-family: 'Montserrat';
//   font-size: '14px';
//   font-weight: 500;
//   line-height: '17px';
//   letter-spacing: '0em';
//   text-align: 'left';
//   width: '192px';
//   height: '31px';
//   top: '153px';
//   left: '356px';
//   border-radius: '10px';
//   border: '1px solid #6F6B6B';
//   '.MuiList-root': {
//     width: '192px',
//     height: '118px',
//     top: '193px',
//     left: '356px'
//   }
//  `

export const StyledProjectDropdown = styled(DropDown)`
  color: theme.palette.text?.primary;
  border-radius: '10px';
  border: '1px solid red';
  & .muilist-root: {
    width: '192px';
    height: '118px';
    top: '193px';
    left: '356px';
    background-color: 'green';
  }
`
