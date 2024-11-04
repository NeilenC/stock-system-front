import { useState, useEffect } from "react";
import { MaterialProps } from "../../materialsProps";

const useMaterialsFilter = (materials: MaterialProps[]) => {
  const [filteredMaterials, setFilteredMaterials] = useState<MaterialProps[]>(materials);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    code: '',
    category: '',
    stock: '',
    color: '',
    width: '',
    height: '',
    weight: 0,
    depth: '',
    price: '',
    observations: '',
    description: ''
  });
  
  const itemsPerPage = 10;

  // Aplica filtros cuando cambian los valores de `filters` o `materials`
  useEffect(() => {
    let filtered = materials;

    // Aplicar todos los filtros
    if (filters.category) {
      filtered = filtered.filter((material) =>
        material.category?.category_name.toLowerCase().includes(filters.category.toLowerCase())
      );
    }
    if (filters.description) {
      filtered = filtered.filter((material) =>
        material.description.toLowerCase().includes(filters.description.toLowerCase())
      );
    }
    if (filters.code) {
      filtered = filtered.filter((material) =>
        material?.code.toLowerCase().includes(filters.code.toLowerCase())
      );
    }
    if (filters.stock) {
      filtered = filtered.filter((material) =>
        material?.actual_stock >= parseFloat(filters.stock)
      );
    }
    if (filters.color) {
      filtered = filtered.filter((material) =>
        material?.color.toLowerCase().includes(filters.color.toLowerCase())
      );
    }
    if (filters.width) {
      filtered = filtered.filter(
        (material) => material.width && material.width >= parseFloat(filters.width)
      );
    }
    if (filters.height) {
      filtered = filtered.filter(
        (material) => material.height && material.height >= parseFloat(filters.height)
      );
    }
    if (filters.weight) {
      const weightValue = parseFloat(String(filters.weight));
      const tolerance = 0.5;
      filtered = filtered.filter((material) =>
        material.weight &&
        material.weight >= weightValue - tolerance &&
        material.weight <= weightValue + tolerance
      );
    }
    if (filters.depth) {
      filtered = filtered.filter(
        (material) => material.depth && material.depth >= parseFloat(filters.depth)
      );
    }
    if (filters.price) {
      filtered = filtered.filter(
        (material) => material.price >= parseFloat(filters.price)
      );
    }
    if (filters.observations) {
      filtered = filtered.filter((material) =>
        material.observations.toLowerCase().includes(filters.observations.toLowerCase())
      );
    }

    // Aplica el resultado del filtrado al estado `filteredMaterials`
    setFilteredMaterials(filtered);

    // Resetea la página si el nuevo total es menor que la página actual
    if (currentPage > Math.ceil(filtered.length / itemsPerPage)) {
      setCurrentPage(1); // Resetea a la primera página si se filtra por encima
    }

  }, [filters, materials, currentPage]);

  // Calcula los materiales para la página actual después de aplicar los filtros
  const currentMaterials = filteredMaterials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cambia de página
  const handlePageChange = (page: number) => {
    // Solo establece la página si está dentro del rango válido
    if (page >= 1 && page <= Math.ceil(filteredMaterials.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  // Actualiza los filtros
  const handleFilter = (newFilters: typeof filters) => {
    setFilters(newFilters); // Actualiza solo los filtros
  };

  return {
    currentMaterials,
    handlePageChange,
    handleFilter,
    currentPage,
    itemsPerPage,
    totalItems: filteredMaterials.length,
  };
};

export default useMaterialsFilter;
