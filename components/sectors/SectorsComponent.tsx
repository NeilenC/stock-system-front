import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import ModalComponent from "../../commons/modals/ModalComponent";
import SectionComponent from "../From-Nabvar/Navbar/Section-page/SectionComponent";
import space from "../../public/space.png";
import CustomButton from "../../commons/buttons-commons/CustomButton";
import Sectors from "./Sectors";
import { useSectorStore } from "../../zustand/sectorsStore";
import SectorFormCreate from "./forms/SectorFormCreate";
import useSectors from "../../hooks/useSectors";

const SectorsComponent = ({ salas, children }: any) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { sectorData } = useSectorStore();
  const [error, setError] = useState("");
  const { getSalas } = useSectors();
  const [selectedSector, setSelectedSector] = useState<any>(null);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmitSector = async () => {
    try {
      if (sectorData) {

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/sectors`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sectorData),
          }
        );

        if (response.ok) {
          await getSalas();
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

  return (
    <Box>
      <SectionComponent icon={space} text={"Espacios"}>
        <CustomButton
          onClick={() => handleOpenModalToCreate()}
          text={"Crear Espacio"}
        />
      </SectionComponent>
      <Box sx={{ paddingInline: "40px", paddingBlock:'20px' }}>
      <Box
      sx={{
        borderRadius: '26px', // Borde redondeado de 26px
        border: '1px solid #ccc', // Agrega un borde
        display: 'flex',
        flexDirection: 'column',
        overflow:'auto'
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Sectors />
        </Grid>
      </Grid>
    </Box>
      </Box>
        
        {/* {children} */}
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
  );
};

export default SectorsComponent;
