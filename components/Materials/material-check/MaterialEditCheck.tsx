import { Box, Grid, Menu, MenuItem, Typography } from "@mui/material";
import MaterialEditForm from "../Modal/Forms/MaterialEditForm";
import ModalButtons from "../../../commons/modals/ModalButtons";
import theme from "../../../themes/theme";
import CustomButton from "../../../commons/buttons-commons/CustomButton";
import { useState } from "react";
import AdjustStock from "../Table/AdjustStock";
import ImageToIcon from "../../../commons/styled-components/IconImages";
import edit from "../../../public/edit.png";

const MaterialEditCheck = ({
  materialToCheck,
  handleCancel,
  handleSave,
  anchorEl,
  isStockModalOpen,
  stockAdjustmentType,
  setUpdatedMaterial,
  updatedMaterial,
  setStockAdjustmentType,
  setIsStockModalOpen,
  setAnchorEl,
}: any) => {
 
  const handleStockUpdate = (newStock: number) => {
    setUpdatedMaterial({ ...updatedMaterial, actual_stock: newStock });
  };

  const handleStockChangeClick = (type: "add" | "remove") => {
    setStockAdjustmentType(type);
    setIsStockModalOpen(true);
  };

  const handleStockModalClose = () => {
    setIsStockModalOpen(false);
    setStockAdjustmentType(null);
  };
  const handleEditClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Abre el menú en el ícono de editar
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
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
      <Box
        sx={{
          bgcolor: theme.palette.secondary.light,
          p: "7px 24px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <Typography sx={{ fontSize: "18px" }}>
          Sección Editable para &quot;{materialToCheck?.name}&quot;

        </Typography>{" "}
        <Grid
          item
          xs={1}
          sm={0.1}
          sx={{ cursor: "pointer", position: "relative" }}
        >
          <ImageToIcon w={20} h={20} icon={edit} onClick={handleEditClick} />

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            sx={{ zIndex: 9999 }}
          >
            <MenuItem
              onClick={() => {
                handleStockChangeClick("add");
                handleMenuClose();
              }}
            >
              Agregar Stock
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleStockChangeClick("remove");
                handleMenuClose();
              }}
            >
              Remover Stock
            </MenuItem>
          </Menu>
        </Grid>
      </Box>
      {/* Content Section */}
      <Box>
        <Box sx={{ padding: "24px" }}>
          <MaterialEditForm
            materialId={materialToCheck?.id ?? null}
            updatedMaterial={updatedMaterial ? updatedMaterial : null}
          />
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
      {isStockModalOpen && (
        <AdjustStock
          isOpen={isStockModalOpen}
          handleClose={handleStockModalClose}
          material={materialToCheck}
          updatedMaterial={updatedMaterial}
          adjustmentType={stockAdjustmentType}
          onStockUpdate={handleStockUpdate}
        />
      )}
    </Box>
  );
};

export default MaterialEditCheck;
