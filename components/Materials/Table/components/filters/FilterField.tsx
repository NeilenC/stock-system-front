import React from 'react';
import { Grid } from '@mui/material';
import { CustomTextFieldComponent } from '../../../StyledMaterial';

interface FilterFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  size: number;
  width: number;
  maxLength?: number;
}

const FilterField: React.FC<FilterFieldProps> = ({ value, onChange, placeholder, size, width, maxLength }) => {
  return (
    <Grid item xs={size}>
      <CustomTextFieldComponent
        fullWidth
        size="small"
        value={value}
        onChange={onChange}
        inputProps={{ style: { textAlign: 'center' }, maxLength }} 
        sx={{ width: `${width}px` }}
      />
    </Grid>
  );
};

export default FilterField;
