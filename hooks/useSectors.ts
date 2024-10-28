import { useEffect, useState } from "react";
import { SectorType } from "../components/sectors/enum";

const useSectors = () => {
  const [sectors, setSalas] = useState<SectorType[]>([]);


  const getSalas = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/sectors`, { method: 'GET' });

      if (!response.ok) {
        throw new Error('Error fetching Salas');
      }

      const data = await response.json(); // Espera a que se resuelva el JSON
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
