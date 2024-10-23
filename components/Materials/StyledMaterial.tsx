import styled from "@emotion/styled";
import theme from "../../themes/theme";
import { Box, Select, TextField } from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
const CustomTextFieldMaterial = styled(TextField)(() => ({
  width: '100%',
  "& .MuiOutlinedInput-root": {
    height: "45px",
    boxSizing: 'border-box', // Asegura consistencia en el tamaño
    "& input": {
      padding: "8px",
      color: theme.palette.primary.dark,
    },
    "& fieldset": {
      borderColor: "#E1E6EF",
    },
    "&:hover fieldset": {
      borderColor: "#B0BEC5",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.info.light,
    },
  },
}));

const CustomSelect = styled(Select)(() => ({
  width: '100%',
  "& .MuiOutlinedInput-root": {
    height: "45px",
    boxSizing: 'border-box', // Igual que en el TextField
    "& .MuiSelect-select": {
      padding: "8px", // Asegurar que el padding sea igual
      color: theme.palette.primary.dark,
    },
    "& fieldset": {
      borderColor: "#E1E6EF",
    },
    "&:hover fieldset": {
      borderColor: "#B0BEC5",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.info.light,
    },
  },
}));

const CustomSelectComponent = ({ placeholder, ...props }: any) => {
  return (
    <CustomSelect
      displayEmpty
      IconComponent={props.open ? ExpandLessOutlinedIcon : ExpandMoreOutlinedIcon}
      {...props}
    >
      {props.children}
    </CustomSelect>
  );
};


export { CustomTextFieldMaterial, CustomSelectComponent };
