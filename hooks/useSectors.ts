import { useEffect, useState } from "react";

export interface SectorProps {
  name: string;
  square_meters: number;
  number_of_bathrooms: number;
  sector: string;
  description: string;
  is_active?: boolean;
}

const useSectors = () => {
  const [sectors, setSalas] = useState<SectorProps[]>([]);


  const getSalas = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/sectors`, { method: 'GET' });

      if (!response.ok) {
        throw new Error('Error fetching Salas');
      }

      const data = await response.json(); // Espera a que se resuelva el JSON
      console.log("sectores actualizado", data)
        setSalas(data); // Asigna los datos al estado
    } catch (error) {
      console.error("Failed to fetch Salas:", error);
    }
  };

  useEffect(() => {
    getSalas();
  }, []);

  return { salas: sectors, setSalas, getSalas }; // Devuelve también la función para actualizar el estado
};

export default useSectors;
