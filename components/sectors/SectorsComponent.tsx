import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import SectorFormCreate from "./SectorFormCreate";
import theme from "../../themes/theme";
import ModalComponent from "../../commons/modals/ModalComponent";
import SectorsInTimeLine from "../../commons/timeline-commons/SectorsInTimeLine";
import SectionComponent from "../From-Nabvar/Navbar/Section-page/SectionComponent";
import space from "../../public/space.png";
import CustomButton from "../../commons/buttons-commons/CustomButton";
import Sectors from "./Sectors";
import useSectors from "../../hooks/useSectors";



const SectorsComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [sectors, setSectors] = useState<any[]>([]);
  const [selectedSector, setSelectedSector] = useState<any>(null);
  const handleOpenModalToCreate = (sector?: any) => {
    setSelectedSector(sector || null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmitSector = async (formData: any) => {
    try {
      // Extract the ID from formData
      const sectorId = formData.id; // Assuming formData.id contains the ID of the sector
  console.log("FORM DATA EN HANDLER", formData)
      // Construct the URL based on whether we're updating or creating
      const url = sectorId
        ? `${process.env.NEXT_PUBLIC_API_BASE}/sectors/${sectorId}` // Update existing sector
        : `${process.env.NEXT_PUBLIC_API_BASE}/sectors`; // Create a new sector
  
      // Determine the HTTP method
      const method = sectorId ? "PATCH" : "POST"; // Use PATCH for existing sector, POST for new one
  
      // Prepare the request body with the fields that have changed
      const requestBody: any = {};
      if (formData.name) requestBody.name = formData.name;
      if (formData.square_meters) requestBody.square_meters = formData.square_meters;
      if (formData.number_of_bathrooms) requestBody.number_of_bathrooms = formData.number_of_bathrooms;
      if (formData.sector) requestBody.sector = formData.sector; // Adjust based on your needs
      if (formData.description) requestBody.description = formData.description;
  
      // Make the API request
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      // Handle the response
      if (response.ok) {
        handleCloseModal(); // Close the modal on success
      } else {
        const errorMessage = await response.text();
        setError(`No se logró ${sectorId ? "editar" : "crear"} el sector: ${errorMessage}`);
      }
    } catch (e) {
      setError(`No se logró ${formData.id ? "editar" : "crear"} el sector`);
      console.error(e);
    }
  };
  

  const handleOpenModalToEdit = (sector: any) => {
    setSelectedSector(sector); // Set the selected sector for editing
    setModalOpen(true);
  };

  return (
    <Box>
      <SectionComponent
        children={
          <CustomButton
            onClick={() => handleOpenModalToCreate()}
            text={"Crear Espacio"}
          ></CustomButton>
        }
        icon={space}
        text={"Espacios"}
      />
      <Box sx={{ paddingInline: "20px" }}>
        <Box>
          <Sectors onSubmit={handleSubmitSector} />
        </Box>

        {/* Modal to create or edit a sector */}
        <ModalComponent
          isOpen={isModalOpen}
          handleClose={handleCloseModal}
          title="Crear un nuevo Espacio"
        >

          <SectorFormCreate
            onSubmit={handleSubmitSector}
            error={error}
            initialData={selectedSector}
            handleClose={handleCloseModal}
          />
        </ModalComponent>

        
      </Box>
    </Box>
  );
};

export default SectorsComponent;
