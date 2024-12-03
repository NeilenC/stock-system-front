import React, { useState, useEffect } from "react";
import ModalComponent from "../../../commons/modals/ModalComponent";
import Toast from "../../../commons/Toast";
import theme from "../../../themes/theme";
import { CategoryProps, useCategoriesContext } from "../context/CategoriesContext";
import HeaderCategories from "./HeaderCategories";
import { Box, Grid,Typography } from "@mui/material";
import TableItemCategory from "./TableItemCategory";
import FiltersCategories from "./FiltersCategories";
import { useModalContext } from "../../Materials/Table/context/ModalContext";
import Pagination from "../../Materials/Table/Pagination";

const initialFormData = {
  name: "",
 
};

const CategoriesComponent = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { openModalCreate, setOpenModalCreate } = useModalContext();
  const {
    currentCategories,
    handlePageChange,
    handleFilter,
    currentPage,
    itemsPerPage,
    totalItems,
    fetchCategories,
  } = useCategoriesContext();
  const [showToast, setShowToast] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [selectedCategory, setSelectedCategory] =
    useState< CategoryProps | null>(null);
  const [toastProps, setToastProps] = useState({
    messageLeft: "",
    messageRight: "",
    bgcolor: theme.palette.success.light,
    color: "",
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
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
    setFormData(initialFormData);

  };

  const handleEdit = (categoryId: number) => {
    setCategoryId(categoryId);
    // setSelectedCategory(category); // Establecer el Category seleccionado

    setIsEditModalOpen(true);
  };

  const handleDelete = (Category: any) => {
    setCategoryId(Category.id);
    setSelectedCategory(Category);
    setIsDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedCategory(null); // Limpiar el Category seleccionado al cerrar el modal
  };

  const handleDeleteConfirm = async () => {

  };
  

  const handleCreateCategory = async (formData: any) => {
    
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    
  };


  return (
    <>
      <Box sx={{}}>
        <Grid container>
          <HeaderCategories />
          <FiltersCategories handleFilter={handleFilter} />

          <Box
            sx={{
              height: "450px",
              overflowX: "auto",
              width: "100%",
              bgcolor: theme.palette.primary.main,
            }}
          >
            {currentCategories.length ? (
              currentCategories.map((category: any, index: any) => (
                <TableItemCategory
                  key={category.id}
                  category={category}
                  index={index}
                  onEdit={handleEdit}
                  openDeleteModal={() => handleDelete(category)}
                />
              ))
            ) : (
              <Typography
                variant="h6"
                sx={{ p: 5, display: "flex", justifyContent: "center" }}
              >
                {" "}
                No se encontraron Categoryes{" "}
              </Typography>
            )}
          </Box>
        </Grid>

        <Pagination
          page={currentPage}
          onPageChange={(newPage: any) => {
            handlePageChange(newPage);
          }}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />

        {isDeleteModalOpen && (
          <ModalComponent
            isOpen={isDeleteModalOpen}
            handleClose={handleDeleteModalClose}
            onSubmit={handleDeleteConfirm}
            title={`¿ Deseas eliminar el Category ${selectedCategory?.name} ?`}
            fromDelete={true}
            textButton="Eliminar"
            width="550px"
          >
            {/* {selectedCategory && (
              <CategoryDetails Category={selectedCategory} />
            )} */} borrar?
          </ModalComponent>
        )}
        {openModalCreate && (
          <ModalComponent
            isOpen={openModalCreate}
            handleClose={handleCloseModalCreate}
            title="Crear Nueva Categoría"
            onSubmit={() => handleCreateCategory(formData)}
            textButton="Guardar"
            // loading={loading}
          >
            {/* <CreateCategoryForm
              formData={formData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
            /> */} crear?
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
    </>
  );
};

export default CategoriesComponent;
