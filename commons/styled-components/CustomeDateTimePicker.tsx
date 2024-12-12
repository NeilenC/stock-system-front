import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import styled from "@emotion/styled";
import theme from "../../themes/theme";

interface CustomDateTimePickerProps {
  value:any;
  onChange: (newValue: Dayjs | null) => void;
  minDate?: Dayjs;
  label?: string;
  error?: boolean;
  helperText?: string;
  withTime?: boolean; // Nueva propiedad opcional para habilitar la hora

}

const StyledDateTimePicker = styled(DateTimePicker)(() => ({
  
  '& .MuiOutlinedInput-root': {
    height:  '45px',
    borderRadius: '6px',
    border: '1px solid #E1E6EF',
    marginBottom: '10px',
    marginTop:  '10px',
    '& input': {
      padding:'8px' , 
    },
    '& fieldset': {
      borderColor: theme.palette.primary.main ,
    },
    '&:hover fieldset': {
      borderColor:  theme.palette.primary.main, 
    },

  }, 


}));


// .css-70yyc-MuiInputBase-root-MuiOutlinedInput-root
const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  value,
  onChange,
  minDate = dayjs(),
  label = "",
  error = false,
  helperText = "",
  withTime = false, // Controla si mostramos la hora o no
}) => {
  // Define el formato dependiendo de si se incluye la hora o no
  // const dateFormat = withTime ? "DD/MM/YYYY HH:mm" : "DD/MM/YYYY";

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDateTimePicker
        label={label}
        value={value}
        onChange={onChange}
        format={ "DD/MM/YYYY HH:mm"} 
        minDate={minDate}
        slotProps={{
          textField: {
            error: error,
            helperText: helperText,
            fullWidth: true,
          },
        }}

       
      />
    </LocalizationProvider>
  );
};

export default CustomDateTimePicker;
