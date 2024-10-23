import { useEffect, useState } from "react";

const useSectors = () => {
  const [salas, setSectors] = useState([]);
  const getSalas = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/sectors`, { method: 'GET' });

      if (!response.ok) {
        throw new Error('Error fetching Salas');
      }

      const data = await response.json(); // Espera a que se resuelva el JSON
      setSectors(data); // Asigna los datos al estado
    } catch (error) {
      console.error("Failed to fetch Salas:", error);
    }
  };

  useEffect(() => {
    getSalas();
  }, []);

  return { salas };
};

export default useSectors;
