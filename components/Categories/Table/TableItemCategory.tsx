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
import IconToImage from "../../../commons/styled-components/IconImages";
import edit from "../../../public/edit.png";
import search from "../../../public/search.png";
import deleteicon from "../../../public/delete.png";
import { useRouter } from "next/router";
import ModalComponent from "../../../commons/modals/ModalComponent";

const TableItemCategory = ({ category, onEdit, index }: any) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const [modalCategoryDelete, setModalCategoryDelete] = useState(false);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCloseModal = () => {
    setModalCategoryDelete(false);
    setErrorMessage("");
  };
  const deleteCategory = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_API_BASE}/materials-category/${categoryId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Error al eliminar la categoría");
      }

      // Si se elimina con éxito, cerrar el modal y refrescar la vista
      handleCloseModal();
    } catch (error: any) {
      setErrorMessage(
        "No se puede borrar la categoría seleccionada ya que tiene materiales asociados"
      ); // Mostrar el mensaje de error en el modal
    }
  };

  const handleEditClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
      <Grid item xs={2} sm={11}>
        {category.category_name}
      </Grid>

      {/* Íconos de Editar y Eliminar */}
      <Grid item xs={1} sm={0.3} sx={{ cursor: "pointer" }}>
        <IconToImage
          icon={deleteicon}
          w={20}
          h={20}
          onClick={() => {
            setModalCategoryDelete(true);
            setCategoryId(category.id);
          }}
        />
      </Grid>
      <Grid
        item
        xs={1}
        sm={0.1}
        sx={{ cursor: "pointer", position: "relative" }}
      >
        <IconToImage w={20} h={20} icon={edit} onClick={handleEditClick} />
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
              onEdit(category.id);
              handleMenuClose();
            }}
          >
            Editar
          </MenuItem>
        </Menu>
      </Grid>
      {modalCategoryDelete && (
        <ModalComponent
          title="¿ Deseas eliminar ésta Categoría ?"
          textButton="Eliminar"
          isOpen={modalCategoryDelete}
          onSubmit={() => categoryId && deleteCategory(categoryId)}
          width="380px"
          handleClose={() => setModalCategoryDelete(false)}
        >
          <Box sx={{ padding: "25px 10px" }}>
            <Typography variant="h6">{category.category_name}</Typography>
            {errorMessage ? (
              <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>
                {errorMessage}
              </Typography>
            ) : (
              <span
              >
                &nbsp;
              </span>
            )}
          </Box>
        </ModalComponent>
      )}
    </Grid>
  );
};

export default TableItemCategory;
