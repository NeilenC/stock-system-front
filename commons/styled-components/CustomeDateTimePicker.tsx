import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";

interface CustomDateTimePickerProps {
  value:any;
  onChange: (newValue: Dayjs | null) => void;
  minDate?: Dayjs;
  label?: string;
  error?: boolean;
  helperText?: string;
  withTime?: boolean; // Nueva propiedad opcional para habilitar la hora
}

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
  const dateFormat = withTime ? "DD/MM/YYYY HH:mm" : "DD/MM/YYYY";

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={label}
        value={value}
        onChange={onChange}
        format={dateFormat} 
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
