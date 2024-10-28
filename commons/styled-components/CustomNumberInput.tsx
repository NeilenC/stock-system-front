import { CustomTextFieldMaterial } from "../../components/Materials/StyledMaterial";

const CustomNumberInput = ({
    name,
    value,
    onChange,
    fullWidth = true,
    required = false,
    margin = "dense",
  }: any) => {
    return (
      <CustomTextFieldMaterial
        type="number"
        name={name}
        value={value || ""} 
        onChange={onChange}
        fullWidth={fullWidth}
        required={required}
        margin={margin}
        InputProps={{
          inputProps: {
            style: {
              appearance: "none", 
              MozAppearance: "textfield", 
            },
          },
          sx: {
            "& input[type=number]": {
              MozAppearance: "textfield", 
            },
            "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
              {
                WebkitAppearance: "none",
                margin: 0,
              },
          },
        }}
      />
    );
  };

  export default CustomNumberInput;