// MaterialsContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { MaterialProps } from "./components/Materials/materialsProps";

type MaterialsContextType = {
  materials: MaterialProps[];
  addMaterial: (material: MaterialProps) => void;
  fetchMaterials: () => void;
};

const MaterialsContext = createContext<MaterialsContextType | undefined>(undefined);

export const MaterialsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [materials, setMaterials] = useState<MaterialProps[]>([]);

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

  return (
    <MaterialsContext.Provider value={{ materials, addMaterial, fetchMaterials }}>
      {children}
    </MaterialsContext.Provider>
  );
};

export const useMaterials = () => {
  const context = useContext(MaterialsContext);
  if (!context) throw new Error("useMaterials must be used within a MaterialsProvider");
  return context;
};
