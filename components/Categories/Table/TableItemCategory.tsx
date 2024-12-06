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
import ImageToIcon from "../../../commons/styled-components/IconImages";
import edit from "../../../public/edit.png";
import search from "../../../public/search.png";
import deleteicon from "../../../public/delete.png";
import { useRouter } from "next/router";
import ModalComponent from "../../../commons/modals/ModalComponent";
import ModalCategory from "../../Materials/Modal/ModalCategoryCreate";
import { useMaterialStore } from "../../../zustand/materialStore";

const TableItemCategory = ({ category, onEdit, index }: any) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const [modalCategoryDelete, setModalCategoryDelete] = useState(false);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [categoryToEdit, setCategoryToEdit] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const  [openModalEdit, setOpenModalEdit] = useState(false);
  const [isEditSucces, setIsEditSuccess] = useState(false)
  const { fetchCategories } = useMaterialStore();
  
useEffect(()=> {
  fetchCategories()
},[isEditSucces])


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
      sx={{
        p:'16px 30px',
        bgcolor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
      }}
    >
      <Grid item xs={2} sm={11}>
        <Typography sx={{}}>{category.category_name}</Typography>
      </Grid>

      {/* Íconos de Editar y Eliminar */}
      <Grid item xs={1} sm={0.5} sx={{ cursor: "pointer" }}>
        <ImageToIcon
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
              setCategoryToEdit(category); // Set the category ID to edit
              setOpenModalEdit(true);
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

{openModalEdit && (
    <ModalCategory
      isOpen={openModalEdit}
      onClose={() => setOpenModalEdit(false)}
      categoryToEdit={categoryToEdit}
      isEditSucces={setIsEditSuccess}
    />
  )}
    </Grid>
  );
};

export default TableItemCategory;
