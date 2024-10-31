import { Box, Typography } from "@mui/material";
import MaterialEditForm from "../Modal/Forms/MaterialEditForm";
import ModalButtons from "../../../commons/modals/ModalButtons";
import theme from "../../../themes/theme";
import CustomButton from "../../../commons/buttons-commons/CustomButton";

const MaterialEditCheck = ({
  materialToCheck,
  handleCancel,
  handleSave,
}: any) => {
  return (
    <Box
      sx={{
        bgcolor: "#FFFF",
        borderRadius: 2,
      }}
    >
      {/* Title Section */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.dark,
          color: "white",
          padding: "15px",
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          paddingInline: "24px",
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Datos del Material
        </Typography>
      </Box>
      <Box sx={{ bgcolor: theme.palette.secondary.light, p: "7px 24px" }}>
          {" "}
          <Typography sx={{ fontSize: "18px" }}>Sección Editable para  "{materialToCheck?.name}"</Typography>{" "}
        </Box>
      {/* Content Section */}
      <Box>
        <Box sx={{ padding: "24px" }}>
          <MaterialEditForm materialId={materialToCheck?.id ?? null} />
        </Box>

        {/* {error && <Box sx={{ color: 'red', mt: 2 }}>{error}</Box>} */}
        <Box sx={{ p: " 0px  24px 16px " }}>
          <CustomButton
            text={"Guardar Cambios"}
            onClick={handleSave}
            sx={{ fontSize: "16px", marginLeft: "auto" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MaterialEditCheck;
