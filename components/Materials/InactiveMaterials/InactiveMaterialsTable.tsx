import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Select, MenuItem } from "@mui/material";
import ModalComponent from "../../../commons/modals/ModalComponent";
import MaterialEditForm from "../Modal/Forms/MaterialEditForm";
import { MaterialProps } from "../materialsProps";
import { useMaterialStore } from "../../../zustand/materialStore";
import CreateMaterialForm from "../Modal/CreateMaterialForm";
import Toast from "../../../commons/Toast";
import theme from "../../../themes/theme";
import { useMaterialsContext } from "../Table/context/MaterialsContextProps";
import { useModalContext } from "../Table/context/ModalContext";
import TableHeader from "../Table/TableHeader";
import Filters from "../Table/components/filters/Filters";
import TableRowItem from "../Table/TableRowItem";
import Pagination from "../Table/Pagination";
import MaterialDetails from "../Table/components/MaterialDetails";
import SectionComponent from "../../From-Nabvar/Navbar/Section-page/SectionComponent";
import materialIcon from "../../../public/materials.png";
import { useFiltersContext } from "../Table/context/FiltersContext";
import CustomButton from "../../../commons/buttons-commons/CustomButton";

const initialFormData = {
  name: "",
  description: "",
  code: "",
  color: "",
  image_url: null,
  weight: 0,
  actual_stock: 0,
  width: 0,
  depth: 0,
  height: 0,
  observations: "",
  price: 0,
  is_active: true,
  category: "",
  distribution_stock: [
    {
      sector_id: 0,
      storaged_stock: 0,
    },
  ],
};

const InactiveMaterialsTable = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { material } = useMaterialStore();
  const { openModalCreate, setOpenModalCreate } = useModalContext();
  const {
    currentMaterials,
    handlePageChange,
    handleFilter,
    currentPage,
    itemsPerPage,
    totalItems,
    setIsFilteringInactive,
    fetchMaterials,updateItemsPerPage
  } = useMaterialsContext();

  const { clearFilters } = useFiltersContext();
  const [showToast, setShowToast] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [materialId, setMaterialId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [openReactivationModal, setOpenReactivationModal] = useState(false);

  const [selectedMaterial, setSelectedMaterial] =
    useState<MaterialProps | null>(null);
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

  const clearAllFilters = () => {
    clearFilters();
    handleFilter({
      code: "",
      name: "",
      category: "",
      description: "",
      weight: "",
      color: "",
      height: "",
      depth: "",
      stock: "",
      observations: "",
      price: "",
      width: "",
    });
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  useEffect(() => {
    setIsFilteringInactive(true);
  }, []);

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
    setFormData(initialFormData);
  };

  const handleEdit = (materialId: number) => {
    setMaterialId(materialId);
    setSelectedMaterial(material);

    setIsEditModalOpen(true);
  };

  const handleDelete = (material: any) => {
    setMaterialId(material.id);
    setSelectedMaterial(material);
    setIsDeleteModalOpen(true);
  };

  const handleReactiveMaterial = (material: any) => {
    setMaterialId(material.id);
    setSelectedMaterial(material);
    setOpenReactivationModal(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedMaterial(null); // Limpiar el material seleccionado al cerrar el modal
  };

  const handleDeleteConfirm = async () => {
    if (!materialId) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials/${materialId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_active: false }), // Cambia is_active a false
        }
      );

      if (!response.ok) {
        throw new Error("Error updating material");
      }
      setIsDeleteModalOpen(false);
      setSelectedMaterial(null); // Limpiar el material seleccionado al confirmar eliminación}7
      showToastMessage(
        "Material eliminado con éxito",
        "",
        theme.palette.success.light,
        "white"
      );
      await fetchMaterials();
      // Aquí podrías llamar a una función para volver a obtener los materiales actualizados
    } catch (error) {
      console.error("Failed to update material:", error);
      showToastMessage(
        "Error al eliminar el material",
        "Intente de nuevo",
        theme.palette.error.light,
        "white"
      );
    }
  };

  const handleSave = async () => {
    try {
      if (!selectedMaterial || !materialId) {
        return;
      }

      const { id, is_active, category, image_url, ...rest } = material;

      const updatedMaterial = {
        ...rest,
        category: category?.id,
        image_url,
      };

      const formData = new FormData();

      Object.entries(updatedMaterial).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value as any);
        }
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials/${materialId}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error updating material");
      }

      setShowToast(true);

      await fetchMaterials();

      setIsEditModalOpen(false);
      showToastMessage(
        "Material actualizado con éxito",
        "",
        theme.palette.success.light,
        "white"
      );
    } catch (error) {
      console.error("Failed to update material:", error);
      showToastMessage(
        "Error al actualizar el material",
        "Intente de nuevo",
        theme.palette.error.light,
        "black"
      );
    }
  };


  const handleCreateMaterial = async (formData: any) => {
console.log("formdataweifht", formData , typeof formData.weight)


    const formD = new FormData();
    formD.append("name", formData.name);
    formD.append("description", formData.description);
    formD.append("code", formData.code);
    formD.append("color", formData.color);
    formD.append("actual_stock", formData.actual_stock);
    formD.append("weight", formData.weight);
    formD.append("width", formData.width);
    formD.append("depth", formData.depth);
    formD.append("height", formData.height);
    formD.append("observations", formData.observations);
    formD.append("price", formData.price);
    formD.append("category", formData.category);

    if (Array.isArray(formData.distribution_stock)) {
      formData.distribution_stock.forEach((item: any, index: number) => {
        formD.append(`distribution_stock[${index}][sector_id]`, item.sector_id);
        formD.append(
          `distribution_stock[${index}][storaged_stock]`,
          item.storaged_stock
        );
      });
    }
    if (formData.image_url) {
      formD.append("image", formData.image_url);
    }
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials/create`,
        {
          method: "POST",

          body: formD,
        }
      );

      if (response.ok) {
        setOpenModalCreate(false);
        setFormData(initialFormData);
        await fetchMaterials();
        showToastMessage(
          "Material creado con éxito",
          "",
          theme.palette.success.light,
          "white"
        );
      } else {
        const errorResponse = await response.json();
        showToastMessage(
          `Error al crear el material: ${errorResponse.message}`,
          "Intente de nuevo",
          theme.palette.error.light,
          "black"
        );
      }
    } catch (error) {
      console.error("Error creando material:", error);
      showToastMessage(
        "Error al crear el material",
        "Intente de nuevo",
        theme.palette.error.light,
        "black"
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name.startsWith("distribution_stock.")) {
        const index = 0; // Suponiendo que solo tienes un objeto en el array
        const fieldName = name.split(".")[1]; // Obtiene el nombre del campo

        return {
          ...prev,
          distribution_stock: prev.distribution_stock.map((item, idx) => {
            if (idx === index) {
              // Asignación de valores correctos y asegurándonos de que sean números
              if (fieldName === "sector_id") {
                return {
                  ...item,
                  sector_id: Number(value), // Asegúrate de que `sector_id` sea un número
                };
              }
              if (fieldName === "storaged_stock") {
                return {
                  ...item,
                  storaged_stock: Number(value), // Asegúrate de que `storaged_stock` sea un número
                };
              }
              return { ...item, [fieldName]: value };
            }
            return item;
          }),
        };
      }

      // Manejo del cambio de category
      return {
        ...prev,
        [name]: name === "category" ? Number(value) : value,
      };
    });
  };

  const handleReactivateMaterial = async () => {
    if (!materialId) return;

    try {
      const reactive = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials/${materialId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_active: true }),
        }
      );

      if (!reactive.ok) {
        throw new Error("Error updating material");
      }
      await fetchMaterials();
      setOpenReactivationModal(false);
      setSelectedMaterial(null);
      setMaterialId(null);
      showToastMessage(
        "Material Restaurado",
        "",
        theme.palette.success.light,
        "white"
      );
      await fetchMaterials();
    } catch (error) {
      console.error("Failed to update material:", error);
      showToastMessage(
        "Error al restaurar el material",
        "Intente de nuevo",
        theme.palette.error.light,
        "white"
      );
    }
  };

  const handleFileChange = (e: any) => {
    if (e.target.files) {
      setFormData({ ...formData, image_url: e.target.files[0] });
    }
  };
  const handleItemsPerPageChange = (event: any) => {
    const value = parseInt(event.target.value, 10); // 
    updateItemsPerPage(value); 
  };
  return (
    <>
      <SectionComponent
        icon={materialIcon}
        text="Tabla de Materiales Inactivos"
      >
        <CustomButton
          text="Limpiar filtros"
          onClick={clearAllFilters}
        ></CustomButton>
      </SectionComponent>
      <Box sx={{ p: "  10px 0px 0px  16px" , display:'flex'}}>
        <Select
          labelId="items-per-page-label"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          label="Items por página"
          sx={{ height: '45px' }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
        <Typography variant='body1'sx={{alignContent:'center', pl:2}}>Registros por página</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
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
        <Grid container>
          <TableHeader />
          <Filters handleFilter={handleFilter} />

          <Box
            sx={{
              height: "450px",
              overflowX: "auto",
              width: "100%",
              bgcolor: theme.palette.primary.main,
            }}
          >
            {currentMaterials.length ? (
              currentMaterials.map((material: MaterialProps, index: any) => (
                <TableRowItem
                  key={material.id}
                  material={material}
                  index={index}
                  onEdit={handleEdit}
                  openDeleteModal={() => handleDelete(material)}
                  openReactionModal={() => handleReactiveMaterial(material)}
                  fromInactive={true}
                />
              ))
            ) : (
              <Typography
                variant="h6"
                sx={{ p: 5, display: "flex", justifyContent: "center" }}
              >
                {" "}
                No se encontraron materiales{" "}
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

        {isEditModalOpen && (
          <ModalComponent
            isOpen={isEditModalOpen ?? false}
            handleClose={handleModalClose}
            title="Editar Material"
            onSubmit={handleSave}
            textButton="Editar"
            loading={loading}
          >
            <MaterialEditForm materialId={materialId} />
          </ModalComponent>
        )}

        {isDeleteModalOpen && (
          <ModalComponent
            isOpen={isDeleteModalOpen}
            handleClose={handleDeleteModalClose}
            onSubmit={handleDeleteConfirm}
            title={`¿ Deseas eliminar el material ${selectedMaterial?.name} ?`}
            fromDelete={true}
            textButton="Eliminar"
            width="550px"
          >
            {selectedMaterial && (
              <MaterialDetails material={selectedMaterial} />
            )}
          </ModalComponent>
        )}
        {openModalCreate && (
          <ModalComponent
            isOpen={openModalCreate}
            handleClose={handleCloseModalCreate}
            title="Crear Material"
            onSubmit={() => handleCreateMaterial(formData)}
            textButton="Guardar"
            // loading={loading}
          >
            <CreateMaterialForm
              formData={formData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
            />
          </ModalComponent>
        )}

        {openReactivationModal && (
          <ModalComponent
            title="¿ Deseas Reactivar el material seleccionado ?"
            isOpen={openReactivationModal}
            onSubmit={handleReactivateMaterial}
            handleClose={() => {
              setOpenReactivationModal(false);
              setSelectedMaterial(null);
              setMaterialId(null);
            }}
            textButton="Reactivar"
          >
            {selectedMaterial && (
              <MaterialDetails material={selectedMaterial} />
            )}
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
      </Box>
    </>
  );
};

export default InactiveMaterialsTable;
