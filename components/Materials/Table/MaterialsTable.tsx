import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import Filters from "./Filters";
import TableHeader from "./TableHeader";
import TableRowItem from "./TableRowItem";
import Pagination from "./Pagination";
import { MaterialProps } from "../materialsProps";

const MaterialsTable = ({ materials }: any) => {
  const [filteredMaterials, setFilteredMaterials] =
    useState<MaterialProps[]>(materials);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState<MaterialProps | null>(null);
  
    const indexOfLastMaterial = currentPage * itemsPerPage;
    const indexOfFirstMaterial = indexOfLastMaterial - itemsPerPage;
    const currentMaterials = filteredMaterials.slice(indexOfFirstMaterial, indexOfLastMaterial);
  
    // Cambiar la página
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

  // Implement filter logic in a separate function
  const handleFilter = (filters: {
    code: string;
    category: string;
    stock: string;
    color: string;
    width: string;
    height: string;
    weight:number;
    depth: string;
    price: string;
    observations: string;
    description: string;
  }) => {
    const {
      code,
      stock,
      category,
      color,
      width,
      weight,
      height,
      depth,
      price,
      observations,
      description,
    } = filters;
    let filtered = materials;

    if (category) {
      filtered = filtered.filter((material: MaterialProps) =>
        material.category.category_name.toLowerCase().includes(category.toLowerCase())
      );
    }

    

    if (description) {
      filtered = filtered.filter((material: MaterialProps) =>
        material.description.toLowerCase().includes(description.toLowerCase())
      );
    }

    if (code) {
      filtered = filtered.filter((material: MaterialProps) =>
        material.code.toLowerCase().includes(code.toLowerCase())
      );
    }

    if (stock) {
      filtered = filtered.filter(
        (material: MaterialProps) => material.actual_stock >= parseFloat(stock)
      );
    }

    if (color) {
      filtered = filtered.filter((material: MaterialProps) =>
        material.color.toLowerCase().includes(color.toLowerCase())
      );
    }

    if (width) {
      filtered = filtered.filter(
        (material: MaterialProps) => material.width >= parseFloat(width)
      );
    }

    if (height) {
      filtered = filtered.filter(
        (material: MaterialProps) => material.height >= parseFloat(height)
      );
    }

    if (weight) {
      const weightValue = parseFloat(weight);
      const tolerance = 0.5; // Puedes ajustar este valor según lo que necesites
      filtered = filtered.filter((material: MaterialProps) => {
        return (
          material.weight >= (weightValue - tolerance) &&
          material.weight <= (weightValue + tolerance)
        );
      });
    }
    

    if (depth) {
      filtered = filtered.filter(
        (material: MaterialProps) => material.depth >= parseFloat(depth)
      );
    }

    if (price) {
      filtered = filtered.filter(
        (material: MaterialProps) => material.price >= parseFloat(price)
      );
    }
    

    if (observations) {
      filtered = filtered.filter((material: MaterialProps) =>
        material.observations.toLowerCase().includes(observations.toLowerCase())
      );
    }

    setFilteredMaterials(filtered);
  };


  // Función para manejar la eliminación
  const handleDelete = (materialId: number) => {
    console.log(`Eliminando material con ID: ${materialId}`);
    // Lógica adicional para eliminar un material
  };

  const handleEdit = (materialId: number) => {
    const materialToEdit = materials.find((material: MaterialProps) => material.id === materialId);
    setSelectedMaterial(materialToEdit);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMaterial(null);
  };
  const handleSave = () => {
    console.log("Material editado:", selectedMaterial);
    // Lógica para guardar el material actualizado
    setIsModalOpen(false);
  };



  return (
    <>
       <Box sx={{ pb: 2 }}>
        <Grid container>
          <TableHeader />
          <Filters onFilter={handleFilter} />

          <Box sx={{ height: '460px', overflowY: 'auto', width:'100%' }}> {/* Establecer alto fijo */}
            {currentMaterials.map((material: any, index) => (
              <TableRowItem key={material.id} material={material} index={index}
              onEdit={handleEdit} // Pasar la función de edición
              onDelete={handleDelete} // Pasar la función de eliminación
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
      </Box>
    </>
  );
};

export default MaterialsTable;
