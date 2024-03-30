import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { StyledSelect,StyledMenuItem } from './BasicSelect.styled';
import { PartnerProject } from '@/types/mentors/mentor.type';

export type SelectType = {
  id: string;
  name: string
}
export type BasicSelectProps = {
  options: PartnerProject[]
  value: string;
  handleChange: (value: string) => void

}

export default function BasicSelect({ options, value, handleChange }: BasicSelectProps) {

  return (
    <Box sx={{marginLeft:'10px'}}>
      <FormControl  >
        <StyledSelect
          value={value}
          onChange={(event) => handleChange(event.target.value as string)}
        >
          {options.map((option) => {
            return (
              <StyledMenuItem 
              value={option.id}>{option.name}</StyledMenuItem>
            )
          })}
        </StyledSelect>
      </FormControl>
    </Box>
  );
}