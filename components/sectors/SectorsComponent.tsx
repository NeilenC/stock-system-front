import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import SectorForm from "./SectorForm";
import theme from "../../theme";
import ModalComponent from "../../commons/modals/ModalComponent";

const SectorsComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [sectors, setSectors] = useState<any[]>([]);
  const [selectedSector, setSelectedSector] = useState<any>(null); 
  const handleOpenModal = (sector?: any) => {
    setSelectedSector(sector || null); 
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmitSector = async (formData: any) => {
    try {
      const url = selectedSector
        ? `${process.env.NEXT_PUBLIC_API_BASE}/sectors/${selectedSector.id}` // Update existing sector
        : `${process.env.NEXT_PUBLIC_API_BASE}/sectors`; // Create a new sector

      const method = selectedSector ? "PATCH" : "POST"; // Use PATCH for partial update, POST for creation

      // Here only the fields that have changed are included.
      const requestBody: any = {};
      if (formData.name) requestBody.name = formData.name;
      if (formData.square_meters) requestBody.square_meters = formData.square_meters;
      if (formData.number_of_bathrooms) requestBody.number_of_bathrooms = formData.number_of_bathrooms;
      if (formData.sector) requestBody.sector = formData.sector_hall;
      if (formData.description) requestBody.description = formData.description;

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        handleCloseModal();
        fetchSectors(); 
      } else {
        const errorMessage = await response.text();
        setError(`No se logró ${selectedSector ? 'editar' : 'crear'} el sector: ${errorMessage}`);
      }
    } catch (e) {
      setError(`No se logró ${selectedSector ? 'editar' : 'crear'} el sector`);
      console.error(e);
    }
  };

  const fetchSectors = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/sectors`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setSectors(data);
      } else {
        setError("No se pudieron obtener los sectores");
      }
    } catch (e) {
      setError("No se logró obtener la lista de sectores");
      console.error(e);
    }
  };

  useEffect(() => {
    fetchSectors();
  }, []);

  return (
    <div>
      <h1>Sectores Disponibles</h1>
      <Box sx={{ paddingInline: '5px' }}>
        {sectors.map((sector) => (
          <Box key={sector.id} sx={{ paddingInline: '5px', marginBottom: '10px' }}>
            <div>{sector.name}</div>
            <div>{sector.square_meters}</div>
            <Button  onClick={() => handleOpenModal(sector)} sx={{bgcolor: theme.palette.secondary.dark}}>Edit</Button>
          </Box>
        ))}
      </Box>

      <Button onClick={() => handleOpenModal()} sx={{bgcolor:'black'}}>Crear Sector</Button>

      {/* Modal to create or edit a sector */}
      <ModalComponent isOpen={isModalOpen} handleClose={handleCloseModal}>
        <SectorForm
          onSubmit={handleSubmitSector} 
          error={error} 
          initialData={selectedSector} 
        />
      </ModalComponent>
    </div>
  );
};

export default SectorsComponent;
