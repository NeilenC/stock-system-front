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
import { useSectorStore } from "../../zustand/sectorsStore";

const SectorsComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const { sectorData } = useSectorStore();

  const [sectors, setSectors] = useState<any[]>([]);
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
        >
          <SectorFormCreate />
        </ModalComponent>
      </Box>
    </Box>
  );
};

export default SectorsComponent;
