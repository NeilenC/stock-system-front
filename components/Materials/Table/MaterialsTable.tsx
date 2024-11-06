import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import Filters from "./components/filters/Filters";
import TableHeader from "./TableHeader";
import TableRowItem from "./TableRowItem";
import Pagination from "./Pagination";
import ModalComponent from "../../../commons/modals/ModalComponent";
import MaterialEditForm from "../Modal/Forms/MaterialEditForm";
// import useMaterialsFilter from "./Hooks/useMaterialsFilter";
import { MaterialProps } from "../materialsProps";
import MaterialDetails from "./components/MaterialDetails";
import { useMaterialStore } from "../../../zustand/materialStore";
import CreateMaterialForm from "../Modal/CreateMaterialForm";
import { toast } from "react-toastify";
import { FiltersProvider } from "./context/FiltersContext";
import { useMaterialsContext } from "./context/MaterialsContextProps";
import Toast from "../../../commons/Toast";
import theme from "../../../themes/theme";

const initialFormData = {
  name: "",
  description: "",
  code: "",
  color: "",
  image_url: null,
  weight: 0,
  width: 0,
  depth: 0,
  height: 0,
  observations: "",
  price: 0,
  is_active: true,
  category: 0,
  distribution_stock: [
    {
      sector_id: 0,
      storaged_stock: 0,
    },
  ],
};

const MaterialsTable = ({
  initialMaterials,
  openModalCreate,
  setOpenModalCreate,
}: {
  initialMaterials: MaterialProps[];
  openModalCreate: boolean;
  setOpenModalCreate: any;
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const { material } = useMaterialStore();

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

  const [selectedMaterial, setSelectedMaterial] =
    useState<MaterialProps | null>(null);
    const [toastProps, setToastProps] = useState({
      messageLeft: "",
      messageRight: "",
      bgcolor: theme.palette.success.light,
      color: "",
    });
    
    const showToastMessage = (messageLeft:string, messageRight:string, bgcolor:string, color:string) => {
      setToastProps({ messageLeft, messageRight, bgcolor, color });
      setShowToast(true);
    };
  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
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
      setLoading(true); // Activamos el loading

      const { category, ...rest } = material; // Desestructuramos el material
      const updatedMaterial = {
        ...rest,
        category: category?.id, // Asumiendo que el campo en el servidor se llama categoryId
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials/${materialId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMaterial),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating material");
      }

      const updatedMaterialsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials/isActive`
      );
      const updatedMaterials = await updatedMaterialsResponse.json();
      setShowToast(true)

      // Actualizamos el estado con los materiales obtenidos
      await fetchMaterials();

      setIsEditModalOpen(false); // Cierra el modal
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
    try {
    setLoading(true); // Activamos el loading

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials/create`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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
          "black"
        );
      } else {
        const errorResponse = await response.json();
        showToastMessage(
          `Error al crear el material: ${errorResponse.message}`,
          "Intente de nuevo",
          theme.palette.error.light,
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

    setFormData((prev) => {
      if (name.startsWith("distribution_stock.")) {
        const index = 0; // Suponiendo que solo tienes un objeto en el array
        const fieldName = name.split(".")[1]; // Obtiene el nombre del campo

        return {
          ...prev,
          distribution_stock: prev.distribution_stock.map((item, idx) => {
            if (idx === index) {
              return {
                ...item,
                [fieldName]: fieldName === "sector_id" ? Number(value) : value,
              };
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
          {/* Otros componentes que necesiten acceso a los filtros */}

          <Box sx={{ height: "450px", overflowX: "auto", width: "100%" }}>
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
            isOpen={isDeleteModalOpen ?? false}
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
            isOpen={openModalCreate ?? false}
            handleClose={handleCloseModalCreate}
            title="Crear Material"
            onSubmit={() => handleCreateMaterial(formData)}
            textButton="Guardar"
            loading={loading}

          >
            <CreateMaterialForm
              formData={formData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
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
