import {
  Box,
  Collapse,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import theme from "../../themes/theme";
import IconToImage from "../../commons/styled-components/IconImages";
import edit from "../../public/edit.png";
import deleteicon from "../../public/delete.png";
import { useState } from "react";
import ModalComponent from "../../commons/modals/ModalComponent";
import SectorDetails from "./SectorDetails";
import Toast from "../../commons/Toast";

const SectorItem = ({
  sector,
  sectorRef,
  onToggle,
  open,
  onEditSector,
  onDelete,
}: any) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | any>(null);
  const [sectorId, setSectorId] = useState<number | null>(null);
  const [selectedSector, setSelectedSector] = useState<any | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastProps, setToastProps] = useState({
    messageLeft: "",
    messageRight: "",
    bgcolor: theme.palette.success.light,
    color: "black",
  });

  const showToastMessage = (
    messageLeft: string,
    messageRight: string,
    bgcolor: string,
    color: string
  ) => {
    setToastProps({ messageLeft, messageRight, bgcolor, color });
    setShowToast(true);
  };
  if (!sector) return null;

  const handleEditClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (sector: any) => {
    setSelectedSector(sector);
    setSectorId(sector.id);
    setIsDeleteModalOpen(true);
  };

  console.log("selectedsetor", selectedSector);
  const handleConfirmDelete = async () => {
    if (
      selectedSector?.sector_activities_ids?.length > 0 ||
      selectedSector?.distribution_stocks?.length > 0
    ) {
      showToastMessage(
        "No es posible eliminar este espacio",
        "",
        theme.palette.error.light,
        "white"
      );
      return; // Detiene la ejecución de la función
    }

    try {
      setIsDeleteModalOpen(false);
      setSectorId(null);
      setSelectedSector(null);
      onDelete(sector.id);
    } catch (error) {
      console.error("Error al realizar la eliminación:", error);
      throw error; // Lanza el error para manejarlo más adelante si es necesario
    }
  };
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };
  return (
    <Box>
      <Box
        ref={sectorRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start", // Puedes cambiar esto a "center" si quieres centrar el texto
          paddingInline: "16px",
          paddingBlock: "8px",
          borderLeft: "7px solid #E1E6EF",
          bgcolor: "#F5F5F5",
          borderBottom: "1px solid #E1E6E0",
          cursor: "pointer",
        }}
        onClick={onToggle}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center", // Centrar verticalmente
            width: "100%",
            height: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size="small" sx={{ p: 0, justifyContent: "center" }}>
              {open ? (
                <ArrowDropDownIcon sx={{ color: theme.palette.primary.dark }} />
              ) : (
                <ArrowRightIcon sx={{ color: "black" }} />
              )}
            </IconButton>
            <Box sx={{ display: "flex", flexDirection: "column", pl: "8px" }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, fontSize: "16px" }}
              >
                {sector.name}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "14px" }}>
                {sector.square_meters} m²
              </Typography>
            </Box>
          </Box>

          {/* Contenedor para los iconos */}
          <Box
            sx={{
              display: "flex",
              ml: "auto",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ cursor: "pointer", pt: 0.5 }}>
              <IconToImage
                icon={deleteicon}
                w={25}
                h={25}
                onClick={() => handleDelete(sector)}
              />
            </Box>

            <Box
              sx={{
                cursor: "pointer",
                position: "relative",
                ml: 2,
                display: "flex",
                pt: 0.5,
              }}
            >
              <IconToImage
                w={25}
                h={25}
                icon={edit}
                onClick={handleEditClick}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditSector(sector.id);
                    handleMenuClose();
                  }}
                >
                  <Typography variant="body1">
                    {" "}
                    {`Editar ${sector.name}`}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
      </Box>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box
          sx={{
            padding: "8px 72px 16px",
            bgcolor: "#ffff",
            borderRadius: "4px",
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontSize: "18px", fontWeight: 500 }}
          >
            Descripción
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "16px" }}>
            {sector.description}
          </Typography>
        </Box>
      </Collapse>

      {/* Modal de confirmación de eliminación */}
      {isDeleteModalOpen && selectedSector && (
        <ModalComponent
          isOpen={isDeleteModalOpen ?? false}
          handleClose={handleCancelDelete}
          onSubmit={handleConfirmDelete}
          textButton="Eliminar"
          title={`Confirmar Eliminación`}
          width="550px"
        >
          <SectorDetails sector={selectedSector} />
        </ModalComponent>
      )}

      {showToast && (
        <Toast
          messageLeft={toastProps.messageLeft}
          messageRight={toastProps.messageRight}
          bgcolor={toastProps.bgcolor}
          color={toastProps.color}
          onClose={() => setShowToast(false)}
        />
      )}
    </Box>
  );
};

export default SectorItem;
