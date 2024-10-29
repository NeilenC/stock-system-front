import React, { useState } from "react";
import { Box } from "@mui/material";
import ModalComponent from "../../commons/modals/ModalComponent";
import SectionComponent from "../From-Nabvar/Navbar/Section-page/SectionComponent";
import space from "../../public/space.png";
import CustomButton from "../../commons/buttons-commons/CustomButton";
import Sectors from "./Sectors";
import { useSectorStore } from "../../zustand/sectorsStore";
import SectorFormCreate from "./forms/SectorFormCreate";

const SectorsComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { sectorData } = useSectorStore();
  const [error, setError] = useState("");
  const [selectedSector, setSelectedSector] = useState<any>(null);
  
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  console.log("sectoooordata", sectorData);

  const handleSubmitSector = async () => {
    try {
      if (sectorData) {
        console.log("sectorData en handleeer", sectorData);
        
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/sectors`,
          { method: "POST", body: JSON.stringify(sectorData) }
        );
        
        if (response.ok) {
          handleCloseModal();
        } else {
          const errorMessage = await response.text();
          setError(`No se logró crear el sector}`);
        }
      }
    } catch (e) {
      setError(`No se logró crear el sector`);
      console.error(e);
    }
  };
  
  const handleOpenModalToCreate = (sector?: any) => {
    setSelectedSector(sector || null);
    setModalOpen(true);
  };
  
  const handleOpenModalToEdit = (sector: any) => {
    setSelectedSector(sector); // Set the selected sector for editing
    setModalOpen(true);
  };

  return (
    <Box>
      <SectionComponent icon={space} text={"Espacios"}>
        <CustomButton
          onClick={() => handleOpenModalToCreate()}
          text={"Crear Espacio"}
        />
      </SectionComponent>
      <Box sx={{ paddingInline: "20px" }}>
        <Box>
          <Sectors />
        </Box>

        {/* Modal to create or edit a sector */}
        <ModalComponent
          isOpen={isModalOpen}
          handleClose={handleCloseModal}
          title="Crear un nuevo Espacio"
          onSubmit={() => handleSubmitSector()}
          textButton="Guardar"
        >
          <SectorFormCreate />
        </ModalComponent>
      </Box>
    </Box>
  );
};

export default SectorsComponent;
