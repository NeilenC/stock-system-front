import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { MaterialProps } from "../../materialsProps";
// import useMaterialsFilter from "../Hooks/useMaterialsFilter";

type MaterialsContextType = {
  materials: MaterialProps[];
  currentMaterials: MaterialProps[];
  addMaterial: (material: MaterialProps) => void;
  fetchMaterials: () => void;
  handleFilter: (filter: any) => void; // Adjust the type based on your filter
  handlePageChange: (page: number) => void;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  updateItemsPerPage: (items: number) => void;
};

const initialFilters = {
  code: '',
  category: '',
  stock: '',
  color: '',
  width: '',
  height: '',
  weight: '',
  depth: '',
  price: '',
  observations: '',
  description: '',
};

const MaterialsContext = createContext<MaterialsContextType | undefined>(undefined);

export const MaterialsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [materials, setMaterials] = useState<MaterialProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const [itemsPerPage, setItemsPerPage] = useState(10); 

// Add a function to update items per page
const updateItemsPerPage = (items: number) => {
  setItemsPerPage(items);
};


  const fetchMaterials = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/materials/isActive`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const addMaterial = (material: MaterialProps) => {
    setMaterials((prevMaterials) => [...prevMaterials, material]);
  };

  const filteredMaterials = useMemo(() => {
    let filtered = materials;

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
        String(material.actual_stock).includes(filters.stock)
      );
    }
    if (filters.color) {
      filtered = filtered.filter((material) =>
        material?.color.toLowerCase().includes(filters.color.toLowerCase())
      );
    }
    if (filters.width) {
      filtered = filtered.filter((material) =>
        material.width && String(material.width).includes(filters.width)
      );
    }
    if (filters.height) {
      filtered = filtered.filter((material) =>
        material.height && String(material.height).includes(filters.height)
      );
    }
    if (filters.weight) {
      filtered = filtered.filter((material) =>
        material.weight && String(material.weight).includes(String(filters.weight))
      );
    }
    if (filters.depth) {
      filtered = filtered.filter((material) =>
        material.depth && String(material.depth).includes(filters.depth)
      );
    }
    if (filters.price) {
      filtered = filtered.filter((material) =>
        String(material.price).includes(filters.price)
      );
    }
    if (filters.observations) {
      filtered = filtered.filter((material) =>
        material.observations.toLowerCase().includes(filters.observations.toLowerCase())
      );
    }

    // Reset page if filtered results don't reach the current page
    if (currentPage > Math.ceil(filtered.length / itemsPerPage)) {
      setCurrentPage(1);
    }

    return filtered;
  }, [materials, filters, currentPage, itemsPerPage]);

  const currentMaterials = useMemo(() => {
    return filteredMaterials.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredMaterials, currentPage, itemsPerPage]);

  const totalItems = filteredMaterials.length;

  const handleFilter = (newFilters: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  return (
    <MaterialsContext.Provider value={{
      materials,
      currentMaterials,
      addMaterial,
      fetchMaterials,
      handleFilter,
      handlePageChange,
      currentPage,
      itemsPerPage,
      totalItems,
      updateItemsPerPage
    }}>
      {children}
    </MaterialsContext.Provider>
  );
};

export const useMaterialsContext = () => {
  const context = useContext(MaterialsContext);
  if (!context) throw new Error("useMaterials must be used within a MaterialsProvider");
  return context;
};
