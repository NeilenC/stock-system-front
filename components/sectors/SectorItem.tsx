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

const SectorItem = ({
  sector,
  sectorRef,
  onToggle,
  open,
  onEditSector,
  onDelete,
}: any) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sectorId, setSectorId] = useState<number | null>(null);
  const [selectedSector, setSelectedSector] = useState<any | null>(null);

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

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/sectors/${sectorId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_active: false }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el sector");
      }

      const data = await response.json();
      setIsDeleteModalOpen(false);
      setSectorId(null);
      setSelectedSector(null);
      onDelete(sector.id);
      return data; // Devuelve los datos actualizados, si es necesario
    } catch (error) {
      console.error("Error al realizar la actualización:", error);
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
      height: "100%", // Asegura que ocupe toda la altura disponible
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
          sx={{ fontWeight: "bold", fontSize: "14px" }}
        >
          {sector.name}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "12px" }}>
          {sector.square_meters} m²
        </Typography>
      </Box>
    </Box>

{/* Contenedor para los iconos */}
<Box sx={{ display: "flex", ml: "auto", alignItems: "center", justifyContent: "center" }}>
  <Box sx={{ cursor: "pointer", pt:0.5 }}>
    <IconToImage
      icon={deleteicon}
      w={20}
      h={20}
      onClick={() => handleDelete(sector)}
    />
  </Box>

  <Box sx={{ cursor: "pointer", position: "relative", ml: 2, display: "flex",  pt:0.5}}>
    <IconToImage w={20} h={20} icon={edit} onClick={handleEditClick} />
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
        {`Editar ${sector.name}`}
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
      sx={{ fontSize: "16px", fontWeight: "bold" }}
    >
      Descripción
    </Typography>
    <Typography variant="body2" sx={{ fontSize: "15px" }}>
      {sector.description}
    </Typography>
  </Box>
</Collapse>


      {/* Modal de confirmación de eliminación */}
      {isDeleteModalOpen && selectedSector && (
        <ModalComponent
          isOpen={isDeleteModalOpen}
          handleClose={handleCancelDelete}
          onSubmit={handleConfirmDelete}
          textButton="Eliminar"
          title={`Confirmar Eliminación`}
          width="550px"

        >
          <SectorDetails sector={selectedSector} />
        </ModalComponent>
      )}
    </Box>
  );
};

export default SectorItem;
