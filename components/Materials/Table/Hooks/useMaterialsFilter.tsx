// hooks/useMaterialsFilter.ts
import { useState, useEffect } from "react";
import { MaterialProps } from "../../materialsProps";

const useMaterialsFilter = (materials: MaterialProps[], updatedMaterial?: MaterialProps | null) => {
  const [filteredMaterials, setFilteredMaterials] = useState<MaterialProps[]>(materials);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastMaterial = currentPage * itemsPerPage;
  const indexOfFirstMaterial = indexOfLastMaterial - itemsPerPage;
  const currentMaterials = filteredMaterials.slice(indexOfFirstMaterial, indexOfLastMaterial);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        material.category?.category_name.toLowerCase().includes(category.toLowerCase())
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
        (material: MaterialProps) => material.width && material.width >= parseFloat(width)
      );
    }

    if (height) {
      filtered = filtered.filter(
        (material: MaterialProps) => material.height && material.height >= parseFloat(height)
      );
    }

    if (weight) {
      const weightValue = parseFloat(weight);
      const tolerance = 0.5; // Puedes ajustar este valor según lo que necesites
      filtered = filtered.filter((material: MaterialProps) => {
        return (
          material.weight&&   material.weight >= (weightValue - tolerance) &&
          material.weight&&    material.weight <= (weightValue + tolerance)
        );
      });
    }
    

    if (depth) {
      filtered = filtered.filter(
        (material: MaterialProps) =>  material.depth && material.depth >= parseFloat(depth)
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
  return {
    currentMaterials,
    handlePageChange,
    filteredMaterials,
    currentPage,handleFilter,
    itemsPerPage,
  };
};

export default useMaterialsFilter;
