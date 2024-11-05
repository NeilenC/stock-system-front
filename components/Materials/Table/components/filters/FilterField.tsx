import React from 'react';
import { Grid } from '@mui/material';
import { CustomTextFieldComponent } from '../../../StyledMaterial';

interface FilterFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  size: number;
  width?: number;
  maxLength?: number;
  sx?: object;
}

const FilterField: React.FC<FilterFieldProps> = ({ value, onChange, placeholder, size, width, maxLength, sx }) => {
  return (
    <Grid item xs={size}  sx={sx}>
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
