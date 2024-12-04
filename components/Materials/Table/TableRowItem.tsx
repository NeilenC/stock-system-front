import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import TextWithPopover from "./components/TextWidthPopOver";
import ImageToIcon from "../../../commons/styled-components/IconImages";
import edit from "../../../public/edit.png";
import search from "../../../public/search.png";
import deleteicon from "../../../public/delete.png";
import AdjustStock from "./AdjustStock";
import { useRouter } from "next/router";
import photo from "../../../public/photo.png";
import notphoto from "../../../public/notimage.png";

import CloseIcon from "@mui/icons-material/Close";
import theme from "../../../themes/theme";
// interface TableRowItemProps {
//   material: {
//     id: string;
//     code: string;
//     category: { category_name: string };
//     description: string;
//     weight: number;
//     color: string;
//     height?: number;
//     depth: number;
//     actual_stock: number;
//     width: number;
//     observations: string;
//     price: number;
//   };
//   openDeleteModal: () => void;
//   onEdit: (id: string) => void;
//   index: number;
// }
const TableRowItem = ({ material, openDeleteModal, onEdit, index }: any) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [stockAdjustmentType, setStockAdjustmentType] = useState<
    "add" | "remove" | null
  >(null);
  const [updatedMaterial, setUpdatedMaterial] = useState(material);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

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

  const handleDescriptionClick = (event: React.MouseEvent<HTMLElement>) => {
    // Lógica para manejar clic en descripción (puedes añadirla si necesitas más funcionalidad)
  };

  const handleObservationsClick = (event: React.MouseEvent<HTMLElement>) => {
    // Lógica para manejar clic en observaciones (puedes añadirla si necesitas más funcionalidad)
  };

  const handleEditClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget) {
      setAnchorEl(event.currentTarget); // Abre el menú en el ícono de editar
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleIconMouseEnter = () => {
    const timeout = setTimeout(() => setIsImageModalOpen(true), 700);
    setHoverTimeout(timeout);
  };

  const handleIconMouseLeave = () => {
    setIsImageModalOpen(false);
  };

  const handleIconClick = () => {
    setIsImageModalOpen(true); // Abre el modal inmediatamente al hacer clic
  };
  return (
    <Grid
      container
      spacing={1}
      sx={{
        textAlign: "center",
        borderBottom: "1px solid #ccc",
        paddingBlock: 1.2,
        bgcolor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
      }}
    >
      {material.image_url != null ? (
        <Grid
          item
          xs={0.1}
          sm={0.3}
          sx={{ cursor: "pointer", position: "relative" }}
          onMouseEnter={handleIconMouseEnter}
          // onMouseLeave={handleIconMouseLeave}
        >
          <ImageToIcon w={20} h={20} icon={photo} onClick={handleIconClick} />

          {/* Modal de imagen */}
          <Modal
            open={isImageModalOpen}
            onClose={() => setIsImageModalOpen(false)}
            aria-labelledby="material-image-modal"
            aria-describedby="material-image-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)", // Centra el modal en la pantalla
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 3,
                pt: 4,
                borderRadius: "5px",
                maxWidth: "80vw",
                maxHeight: "80vh",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: "24px",
                  color: theme.palette.primary.dark,
                }}
              >
                {material.name}
              </Typography>

              <IconButton
                onClick={() => setIsImageModalOpen(false)}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE}${material.image_url}`}
                alt={material.name}
                style={{ height: "400px", width: "600px", borderRadius: "5px" }}
              />
            </Box>
          </Modal>
        </Grid>
      ) : (
        <Grid
          item
          xs={0.1}
          sm={0.3}
          sx={{ cursor: "pointer", position: "relative" }}
          onMouseEnter={handleIconMouseEnter}
          // onMouseLeave={handleIconMouseLeave}
        >
          <ImageToIcon
            w={20}
            h={20}
            icon={notphoto}
            onClick={handleIconClick}
          />
        </Grid>
      )}

      <Grid item xs={2} sm={1}>
        {material.code}
      </Grid>

      <TextWithPopover
        text={material.name}
        title="Nombre"
        onClick={handleDescriptionClick}
      />
      <Grid item xs={2} sm={1}>
        {material.category.category_name}
      </Grid>
      {/* <TextWithPopover
          text={material.description}
          title="Descripción"
          onClick={handleDescriptionClick}
        /> */}
      <Grid item xs={2} sm={0.9}>
        {material.weight}
      </Grid>
      <Grid item xs={2} sm={1}>
        {material.color}
      </Grid>
      <Grid item xs={2} sm={1}>
        {material.height || "N/A"}
      </Grid>
      <Grid item xs={2} sm={0.6}>
        {material.depth}
      </Grid>
      <Grid item xs={2} sm={1}>
        {updatedMaterial.actual_stock}
      </Grid>
      <Grid item xs={2} sm={0.6}>
        {updatedMaterial.width}
      </Grid>

      <TextWithPopover
        text={material.observations}
        title="Observaciones"
        onClick={handleObservationsClick}
      />
      <Grid item xs={2} sm={0.9}>
        ${material.price}
      </Grid>

      {/* Íconos de Editar y Eliminar */}
      <Grid item xs={1} sm={0.3} sx={{ cursor: "pointer" }}>
        <ImageToIcon
          icon={deleteicon}
          w={20}
          h={20}
          onClick={openDeleteModal}
        />
      </Grid>
      <Grid item xs={1} sm={0.2} sx={{ cursor: "pointer" }}>
        <ImageToIcon
          icon={search}
          w={20}
          h={20}
          onClick={() => router.push(`/deposito/material/${material.id}`)}
        />
      </Grid>
      <Grid
        item
        xs={1}
        sm={0.1}
        sx={{ cursor: "pointer", position: "relative" }}
      >
        <ImageToIcon w={20} h={20} icon={edit} onClick={handleEditClick} />
        {/* Menú para editar */}
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
              onEdit(material.id);
              handleMenuClose();
            }}
          >
            Editar
          </MenuItem>
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
        {/* Modal para ajustar stock */}
        {isStockModalOpen && (
          <AdjustStock
            isOpen={isStockModalOpen}
            handleClose={handleStockModalClose}
            material={material}
            updatedMaterial={updatedMaterial}
            adjustmentType={stockAdjustmentType}
            onStockUpdate={handleStockUpdate}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default TableRowItem;
