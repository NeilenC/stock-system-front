import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Filters from "./components/filters/Filters";
import TableHeader from "./TableHeader";
import TableRowItem from "./TableRowItem";
import Pagination from "./Pagination";
import ModalComponent from "../../../commons/modals/ModalComponent";
import MaterialEditForm from "../Modal/Forms/MaterialEditForm";
import useMaterialsFilter from "./Hooks/useMaterialsFilter";
import usePagination from "./Hooks/usePagination";
import { MaterialProps } from "../materialsProps";
import MaterialDetails from "./components/MaterialDetails";
import { useMaterialStore } from "../../../zustand/materialStore";
import { CustomTextFieldMaterial } from "../StyledMaterial";
import { Button } from "rsuite";
import { useUserStore } from "../../../zustand/useAuthStore";

const MaterialsTable = ({
  initialMaterials,
}: {
  initialMaterials: MaterialProps[];
}) => {
const {email} = useUserStore()
  const [materials, setMaterials] = useState<MaterialProps[]>(initialMaterials);
  const {  currentMaterials,
  handlePageChange,
  filteredMaterials,
  currentPage,handleFilter,
  itemsPerPage } = useMaterialsFilter(materials);

  const { material } = useMaterialStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [materialId, setMaterialId] = useState<number | null>(null);
  const [selectedMaterial, setSelectedMaterial] =
    useState<MaterialProps | null>(null); // Estado para el material seleccionado
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [stockAdjustment, setStockAdjustment] = useState(0); // Para almacenar la cantidad a sumar/restar
  const [stockAction, setStockAction] = useState('increase'); // Default action to "increase"
  
  const fetchMaterials = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/materials`);
      const data = await response.json();

      setMaterials(data);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    }
  };
  useEffect(() => {

    fetchMaterials();
  }, []); 


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
console.log("materialid", materialId)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials/${materialId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_active: false }), // Cambiar is_active a false
        }
      );

      if (!response.ok) {
        throw new Error("Error updating material");
      }

      setIsDeleteModalOpen(false);
      setSelectedMaterial(null); // Limpiar el material seleccionado al confirmar eliminación}7
      await fetchMaterials();
      // Aquí podrías llamar a una función para volver a obtener los materiales actualizados
    } catch (error) {
      console.error("Failed to update material:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (!selectedMaterial || !materialId) {
        console.error("Material or Material ID is missing");
        return;
      }

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
          body: JSON.stringify(updatedMaterial), // Convertimos el objeto material a JSON
        }
      );

      if (!response.ok) {
        throw new Error("Error updating material");
      }

      const updatedMaterialsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials`
      );
      const updatedMaterials = await updatedMaterialsResponse.json();

      // Actualizamos el estado con los materiales obtenidos
      setMaterials(updatedMaterials);
      setIsEditModalOpen(false); // Cierra el modal
    } catch (error) {
      console.error("Failed to update material:", error);
    }
  };





  return (
    <>
      <Box sx={{ pb: 2 }}>
        <Grid container>
          <TableHeader />
          <Filters onFilter={handleFilter} />

          <Box sx={{ height: "460px", overflowY: "auto", width: "100%" }}>
            {currentMaterials.map((material: MaterialProps, index) => (
              <TableRowItem
                key={material.id}
                material={material}
                index={index}
                onEdit={handleEdit}
                openDeleteModal={() => handleDelete(material)} // Pasa el material a la función de eliminación
              />
            ))}
          </Box>
        </Grid>

        <Pagination
          page={currentPage}
          onPageChange={handlePageChange}
          totalItems={filteredMaterials.length}
          itemsPerPage={itemsPerPage}
        />

        {isEditModalOpen && (
          <ModalComponent
            isOpen={isEditModalOpen}
            handleClose={handleModalClose}
            title="Editar Material"
            onSubmit={handleSave}
            textButton='Editar'
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
          >
            {selectedMaterial && (
              <MaterialDetails material={selectedMaterial} />
            )}
          </ModalComponent>
        )}

        {/* {isStockModalOpen && (
          <ModalComponent
            isOpen={isStockModalOpen}
            handleClose={() => setIsStockModalOpen(false)}
            title={`Ajustar stock para ${selectedMaterial?.name}`}
            onSubmit={handleStockAdjustmentConfirm}
          >
            <CustomTextFieldMaterial
              label="Cantidad"
              type="number"
              value={stockAdjustment}
              onChange={(e) => setStockAdjustment(Number(e.target.value))} // Asegúrate de convertir a número
              fullWidth
            />
          </ModalComponent>
        )} */}
      </Box>
    </>
  );
};

export default MaterialsTable;
