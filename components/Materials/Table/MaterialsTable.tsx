import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import Filters from "./components/filters/Filters";
import TableHeader from "./TableHeader";
import TableRowItem from "./TableRowItem";
import Pagination from "./Pagination";
import ModalComponent from "../../../commons/modals/ModalComponent";
import MaterialEditForm from "../Modal/Forms/MaterialEditForm";
import { MaterialProps } from "../materialsProps";
import MaterialDetails from "./components/MaterialDetails";
import { useMaterialStore } from "../../../zustand/materialStore";
import CreateMaterialForm from "../Modal/CreateMaterialForm";
import { useMaterialsContext } from "./context/MaterialsContextProps";
import Toast from "../../../commons/Toast";
import theme from "../../../themes/theme";
import { useModalContext } from "./context/ModalContext";

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

const MaterialsTable = () => {
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
    fetchMaterials,
  } = useMaterialsContext();
  const [showToast, setShowToast] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [materialId, setMaterialId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false); // Estado de carga

  const [formErrors, setFormErrors] = useState<any>({});

  const handleValidation = () => {
    const newErrors: any = {};

    // Validación de campos básicos
    newErrors.name = formData.name ? "" : " * ";
    newErrors.code = formData.code ? "" : " * ";
    newErrors.category = formData.category ? "" : " * ";
    newErrors.description = formData.description ? "" : " * ";
    newErrors.actual_stock = formData.actual_stock ? "" : " * ";
    newErrors.observations = formData.observations ? "" : " * ";
    newErrors.price = formData.price ? "" : " * ";

    // Validación de sector_id
    newErrors.sector_id = formData.distribution_stock[0].sector_id ? "" : " * ";

    // Validación de cada campo dentro de `distribution_stock`
    newErrors.distribution_stock = formData.distribution_stock.map(
      (item: any, index: number) => ({
        sector_id: item.sector_id ? "" : " * ",
        storaged_stock: item.storaged_stock ? "" : " * ",
      })
    );

    // Actualizamos el estado de errores
    setFormErrors(newErrors);

    // Retornamos `true` si no hay errores, `false` si existe al menos uno
    return Object.values(newErrors).every((fieldError: any) => !fieldError);
  };

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
  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
    setFormData(initialFormData);
    setFormErrors({});
  };

  const handleEdit = (materialId: number) => {
    setMaterialId(materialId);
    setSelectedMaterial(material); // Establecer el material seleccionado

    setIsEditModalOpen(true);
  };

  const handleDelete = (material: any) => {
    setMaterialId(material.id);
    setSelectedMaterial(material);
    setIsDeleteModalOpen(true);
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
    const errors = handleValidation();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors); // Mostrar los errores en el estado
      return; // No enviar el formulario si hay errores
    }

    const formD = new FormData();
    formD.append("name", formData.name);
    formD.append("description", formData.description);
    formD.append("code", formData.code);
    formD.append("color", formData.color);
    formD.append("actual_stock", formData.actual_stock);
    formD.append("weight", formData.weight.toString());
    formD.append("width", formData.width.toString());
    formD.append("depth", formData.depth.toString());
    formD.append("height", formData.height.toString());
    formD.append("observations", formData.observations);
    formD.append("price", formData.price.toString());
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
        setFormErrors({});

        await fetchMaterials();
        showToastMessage(
          "Material creado con éxito",
          "",
          theme.palette.success.light,
          "white"
        );
      }
    } catch (error) {
      console.error("Error creando material:", error);
      showToastMessage(
        "Error al crear el material",
        "Intente de nuevo",
        theme.palette.error.light,
        "white"
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
  
    // Aquí limpiamos el error si el campo ya está completado
    let newFormErrors = { ...formErrors };
    setFormData((prev) => {
  
      // Validamos si el campo debe limpiarse
      if (name === "name" && value.trim() !== "") {
        newFormErrors = { ...newFormErrors, name: "" }; // Limpia el error si 'name' no está vacío
      }
      if (name === "category" && value) {
        newFormErrors = { ...newFormErrors, category: "" }; // Limpia el error si 'category' está seleccionado
      }
      if (name === "description" && value.trim() !== "") {
        newFormErrors = { ...newFormErrors, description: "" }; // Limpia el error si 'description' no está vacío
      }
      if (name === "code" && value.trim() !== "") {
        newFormErrors = { ...newFormErrors, code: "" }; // Limpia el error si 'code' no está vacío
      }
      if (name === "storaged_stock" && value !== "") {
        newFormErrors = { ...newFormErrors, storaged_stock: "" }; // Limpia el error si 'storaged_stock' está correctamente completado
      }
      if (name === "distribution_stock.sector_id" && value !== "") {
        newFormErrors = { ...newFormErrors, sector_id: "" }; // Limpia el error si 'sector_id' está seleccionado
      }
  
      // Manejo de otros campos en la estructura 'distribution_stock'
      if (name.startsWith("distribution_stock.")) {
        const index = 0; // Suponiendo que solo tienes un objeto en el array
        const fieldName = name.split(".")[1]; // Obtiene el nombre del campo
  
        return {
          ...prev,
          distribution_stock: prev.distribution_stock.map((item, idx) => {
            if (idx === index) {
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
  
    setFormErrors(newFormErrors);  // Actualiza el estado de los errores
  };
  

  const handleFileChange = (e: any) => {
    if (e.target.files) {
      setFormData({ ...formData, image_url: e.target.files[0] });
    }
  };

  return (
    <>
      <Box sx={{}}>
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
              formErrors={formErrors}
            />
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

export default MaterialsTable;
