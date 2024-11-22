import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";

interface CustomDateTimePickerProps {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  minDate?: Dayjs;
  label?: string;
  error?: boolean;
  helperText?: string;
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  value,
  onChange,
  minDate = dayjs(),
  label = "",
  error = false,
  helperText = "",
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={label}
        value={value}
        onChange={onChange}
        format="DD/MM/YYYY"
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
