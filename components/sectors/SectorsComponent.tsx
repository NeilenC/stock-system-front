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

import theme from "../../themes/theme";
import Toast from "../../commons/Toast";

const SectorsComponent = ({ salas, children }: any) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { sectorData, setSectorData, resetSectorData } = useSectorStore();
  const [error, setError] = useState("");
  const { salas: sectorsList, setSalas } = useSectors();
  const [selectedSector, setSelectedSector] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastProps, setToastProps] = useState({
    messageLeft: "",
    messageRight: "",
    bgcolor: theme.palette.success.light,
    color: "black",
  });

  const showToastMessage = (
    messageLeft: string,
    messageRight: string,
    bgcolor: string,
    color: string
  ) => {
    setToastProps({ messageLeft, messageRight, bgcolor, color });
    setShowToast(true);
  };
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
          const newSector = await response.json();
          setSalas([...sectorsList, newSector]);
          handleCloseModal();
          showToastMessage(
            "Sector creado con éxito",
            "",
            theme.palette.success.light,
            "white"
          );
        } else {
          const errorMessage = await response.text();
          setError(`No se logró crear el sector}`);
          showToastMessage(
            "Error al crear el espacio. Intente nuevamente",
            "Intente de nuevo",
            theme.palette.error.light,
            "black"
          );
        }
      }
    } catch (e) {
      setError(`No se logró crear el espacio`);
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
      <Box sx={{ paddingInline: "40px", paddingBlock: "20px" }}>
        <Box
          sx={{
            borderRadius: "10 px", // Borde redondeado de 26px
            border: "1px solid #ccc", // Agrega un borde
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Sectors salas={sectorsList} setSalas={setSalas} />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* {children} */}
      {/* Modal to create or edit a sector */}
      <ModalComponent
        isOpen={isModalOpen ?? false}
        handleClose={handleCloseModal}
        title="Crear un nuevo Espacio"
        onSubmit={() => handleSubmitSector()}
        textButton="Guardar"
      >
        <SectorFormCreate />
      </ModalComponent>
      {showToast && (
        <Toast
          messageLeft={toastProps.messageLeft}
          messageRight={toastProps.messageRight}
          bgcolor={toastProps.bgcolor}
          color={toastProps.color}
          onClose={() => setShowToast(false)}
        />
      )}
    </Box>
  );
};

export default SectorsComponent;
