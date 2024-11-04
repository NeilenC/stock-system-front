import { useEffect, useState } from "react";
import SectionComponent from "../../From-Nabvar/Navbar/Section-page/SectionComponent";
import { Box } from "@mui/material";
import MaterialsTable from "./MaterialsTable";
import ModalComponent from "../../../commons/modals/ModalComponent";
import CreateMaterialForm from "../Modal/CreateMaterialForm";
import { toast } from "react-toastify";
import { useMaterials } from "../../../MaterialsContex";
import CustomButton from "../../../commons/buttons-commons/CustomButton";
import materialsicon from "../../../public/materials.png";

const MainComponent = () => {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const { materials, addMaterial } = useMaterials();


 

  return (
    <>
     <SectionComponent icon={materialsicon} text={"Materiales"}>
        <Box display={"flex"} gap={2}>
          <CustomButton
            onClick={handleOpenModalCreate}
            text={"Crear Material"}
          />
          {/* <CustomButton onClick={clearFilters} text={"Limpiar Filtros"} /> */}
        </Box>
      </SectionComponent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Centra horizontalmente
          alignItems: "center", // Centra verticalmente
          paddingBlock: "16px",
          paddingInline: "16px",
        }}
      >
        <Box
          sx={{
            borderRadius: "16px",
            border: "1px solid #E2E8F0",
            overflow: "hidden",
          }}
        >
          <MaterialsTable initialMaterials={materials} openModalCreate={openModalCreate} setOpenModalCreate={setOpenModalCreate} />
        </Box>
      </Box>
     
    </>
  );
};

export default MainComponent;
