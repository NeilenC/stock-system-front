import { useEffect, useState } from "react";

export interface SectorProps {
  id:number;
  name: string;
  square_meters: number;
  number_of_bathrooms: number;
  sector: string;
  description: string;
  is_active?: boolean;
}

const useSectors = () => {
  const [sectors, setSalas] = useState<SectorProps[]>([]);
  const [storageSectors, setStorageSectors] = useState<SectorProps[]>([]);
  const [ticketOfficeSectors, setTicketOfficeSectors] = useState<SectorProps[]>([]);
  const [excludedSectors, setExcludedSectors] = useState<SectorProps[]>([]);

  const getSalas = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/sectors`, { method: 'GET' });

      if (!response.ok) {
        throw new Error('Error fetching Salas');
      }

      const data = await response.json(); 
        setSalas(data); 

        const storageSectors = data.filter((sector: SectorProps) => sector.sector === "Depósito");
        setStorageSectors(storageSectors);

        const ticketOfficeSectors = data.filter((sector: SectorProps) => sector.sector === "Boleterías");
        setTicketOfficeSectors(ticketOfficeSectors);

        const filteredSectors = data.filter(
          (sector: SectorProps) => sector.sector !== "Depósito" && sector.sector !== "Boletería"
        );
        setExcludedSectors(filteredSectors);

    } catch (error) {
      console.error("Failed to fetch Salas:", error);
    }
  };

  useEffect(() => {
    getSalas();
  }, []);

  return { salas: sectors, storageSectors, setSalas,setStorageSectors,ticketOfficeSectors, excludedSectors, getSalas }; // Devuelve también la función para actualizar el estado
};

export default useSectors;
