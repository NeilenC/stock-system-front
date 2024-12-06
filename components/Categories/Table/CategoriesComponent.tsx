import React, { useState, useEffect } from "react";
import ModalComponent from "../../../commons/modals/ModalComponent";
import Toast from "../../../commons/Toast";
import theme from "../../../themes/theme";
import {
  CategoryProps,
  useCategoriesContext,
} from "../context/CategoriesContext";
import HeaderCategories from "./HeaderCategories";
import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import TableItemCategory from "./TableItemCategory";
import FiltersCategories from "./FiltersCategories";
import { useModalContext } from "../../Materials/Table/context/ModalContext";
import Pagination from "../../Materials/Table/Pagination";
import SectionComponent from "../../From-Nabvar/Navbar/Section-page/SectionComponent";
import categotiesIcon from "../../../public/category_search.png";
import CustomButton from "../../../commons/buttons-commons/CustomButton";
import ModalCategory from "../../Materials/Modal/ModalCategoryCreate";
import { useFiltersCategoriesContext } from "../context/FiltersCategoriesContext";

const initialFormData = {
  name: "",
};

const CategoriesComponent = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { openModalCreate, setOpenModalCreate } = useModalContext();
  const {
    currentCategories,
    handlePageChange,
    updateItemsPerPage,
    handleFilter,
    currentPage,
    itemsPerPage,
    totalItems,
    fetchCategories,
  } = useCategoriesContext();

  const [showToast, setShowToast] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps | null>(null);


  const [toastProps, setToastProps] = useState({
    messageLeft: "",
    messageRight: "",
    bgcolor: theme.palette.success.light,
    color: "",
  });



  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
    setFormData(initialFormData);
  };

  const handleCreateCategorySuccess = () => {
    fetchCategories();
  };

  const handleEdit = (category: CategoryProps) => {
    // setCategoryId(category.id);
    setSelectedCategory(category)
    setIsEditModalOpen(true);
  };
  console.log("selectedCategory", selectedCategory)

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

  const handleDeleteConfirm = async () => {};

  const handleCreateCategory = async (formData: any) => {};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {};
  console.log("itemsperpage", itemsPerPage)

  return (
    <>
      <SectionComponent text="Categorías" icon={categotiesIcon}>
        {/* <CustomButton text="Limpiar Filtros" /> */}
        <CustomButton
          text="Crear Categoría "
          onClick={() => setOpenModalCreate(true)}
        />
      </SectionComponent>
     

      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center", 
          paddingBlock: "10px",
          paddingInline: "16px",
        }}
      >
        <Box
          sx={{
            borderRadius: "16px",
            border: "1px solid #E2E8F0",
            overflow: "hidden",
          }}
        >
        <FiltersCategories handleFilter={handleFilter} />


        <Grid container>
          <HeaderCategories />
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
                  setOpenModalEdit={setOpenModalEdit}
                />
              ))
            ) : (
              <Typography
                variant="h6"
                sx={{ p: 5, display: "flex", justifyContent: "center" }}
              >
                {" "}
                No se encontraron Categorías{" "}
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

        {openModalCreate && (
          <ModalCategory
            isOpen={openModalCreate}
            onClose={handleCloseModalCreate}
            onCreateSuccess={handleCreateCategorySuccess}
          />
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
</Box>
{openModalEdit && (
    <ModalCategory
      isOpen={openModalEdit}
      onClose={() => setOpenModalEdit(false)}
      categoryToEdit={selectedCategory}
      // isEditSucces={setIsEditSuccess}
    />
  )}
    </>
  );
};

export default CategoriesComponent;
