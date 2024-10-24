import { useEffect, useState } from "react";
import CustomButton from "../../../commons/buttons-commons/CustomButton";
import SectionComponent from "../../From-Nabvar/Navbar/Section-page/SectionComponent";
import materialsicon from "../../../public/materials.png";
import { Box } from "@mui/material";
import { MaterialProps } from "../materialsProps";
import MaterialsTable from "./MaterialsTable";

const MainComponent = () => {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [materials, setMaterials] = useState<MaterialProps[]>([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials`
      );
      const data = await response.json();
      setMaterials(data);
    };

    fetchMaterials();
  }, []);

  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };
  return (
    <>
      <SectionComponent icon={materialsicon} text={"Materiales"}>
        <CustomButton onClick={handleOpenModalCreate} text={"Crear Material"} />
      </SectionComponent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Centra horizontalmente
          alignItems: 'center', // Centra verticalmente
          paddingBlock: '16px',
          paddingInline:'16px'
        }}
      >
        <Box
          sx={{
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
          
          }}
        >
          <MaterialsTable materials={materials} />
        </Box>
      </Box>
    </>
  );
  
};

export default MainComponent;
