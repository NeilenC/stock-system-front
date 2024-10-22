import styled from "@emotion/styled";
import theme from "../../themes/theme";
import { TextField } from "@mui/material";

const CustomTextFieldMaterial = styled(TextField)(() => ({
  width:'100%',
  "& .MuiOutlinedInput-root": {
    height: "38px",
    "& input": {
      padding: "8px",
      color: theme.palette.primary.dark
    },
    "& fieldset": {
      borderColor: "#E1E6EF",
    },
    "&:hover fieldset": {
      borderColor: "#B0BEC5",
    },
  },
}));

export { CustomTextFieldMaterial };
