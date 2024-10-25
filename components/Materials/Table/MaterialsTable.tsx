import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Filters from "./Filters";
import TableHeader from "./TableHeader";
import TableRowItem from "./TableRowItem";
import Pagination from "./Pagination";
import ModalComponent from "../../../commons/modals/ModalComponent";
import MaterialEditForm from "../Modal/Forms/MaterialEditForm";
import useMaterialsFilter from "./Hooks/useMaterialsFilter";
import { MaterialProps } from "../materialsProps";
import { useMaterialStore } from "../../../zustand/materialStore";

const MaterialsTable = ({ materials: initialMaterials }: any) => {
  const [materials, setMaterials] = useState<MaterialProps[]>(initialMaterials); // Estado local para los materiales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materialId, setMaterialId] = useState<number | null>(null);
  const { material } = useMaterialStore();
  const {
    currentMaterials,
    handlePageChange,
    filteredMaterials,
    handleFilter,
    currentPage,
    itemsPerPage,
  } = useMaterialsFilter(materials);

  // Efecto para sincronizar el estado local con las props iniciales
  useEffect(() => {
    setMaterials(initialMaterials);
  }, [initialMaterials]);

  const handleEdit = (materialId: number) => {
    setMaterialId(materialId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    try {
      // Asegúrate de que el material esté disponible antes de intentar actualizarlo
      if (!material || !materialId) {
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

      // Material actualizado con éxito, ahora hacemos un nuevo fetch de todos los materiales
      const updatedMaterialsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials`
      );
      const updatedMaterials = await updatedMaterialsResponse.json();

      // Actualizamos el estado con los materiales obtenidos
      setMaterials(updatedMaterials);
      setIsModalOpen(false); // Cierra el modal
    } catch (error) {
      console.error("Failed to update material:", error);
    }
  };

  console.log("materias", materials);

  return (
    <>
      <Box sx={{ pb: 2 }}>
        <Grid container>
          <TableHeader />
          <Filters onFilter={handleFilter} />

          <Box sx={{ height: "460px", overflowY: "auto", width: "100%" }}>
            {currentMaterials.map((material: any, index) => (
              <TableRowItem
                key={material.id}
                material={material}
                index={index}
                onEdit={handleEdit}
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

        {isModalOpen && (
          <ModalComponent
            isOpen={isModalOpen}
            handleClose={handleModalClose}
            title="Editar Material"
            onSubmit={handleSave}
          >
            <MaterialEditForm
              materialId={materialId}
            />
          </ModalComponent>
        )}
      </Box>
    </>
  );
};

export default MaterialsTable;
