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
import useFilters from "./Hooks/useFilters";
import useMaterialsFilter from "./Hooks/useMaterialsFilter";
import theme from "../../../themes/theme";
import * as XLSX from "xlsx"; // Importa la librería para Excel
import download from '../../../public/download.png'
const MainComponent = () => {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const { materials } = useMaterials();
  const { clearFilters } = useFilters();

  // Función para exportar los materiales a Excel
  const exportToExcel = () => {
    // Define los datos y el encabezado de la tabla
    const worksheetData = materials.map((material) => ({
      Código: material.code,
      Categoría: material.category?.category_name,
      Stock: material.actual_stock,
      Color: material.color,
      Ancho: material.width,
      Alto: material.height,
      Peso: material.weight,
      Profundidad: material.depth,
      Precio: material.price,
      Observaciones: material.observations,
      Descripción: material.description,
    }));

    // Crea un libro y una hoja de trabajo
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Agrega la hoja al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, "Materiales");

    // Genera el archivo Excel y lo descarga
    XLSX.writeFile(workbook, "Materiales.xlsx");
  };

  return (
    <>
     <SectionComponent icon={materialsicon} text={"Materiales"}>
        <Box display={"flex"} gap={2}>
          {/* <CustomButton onClick={clearFilters} text={"Limpiar Filtros"}
           sx={{
            backgroundColor: "rgba(0, 0, 0, 0.01)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            color: theme.palette.primary.dark,
            padding: "8px 16px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
          }} /> */}
          <CustomButton
            onClick={exportToExcel}
            text={"Exportar a Excel"}
            icon={download}

            sx={{
              backgroundColor: theme.palette.success.main,
              color: "white",
              padding: "8px 16px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          />
          <CustomButton
            onClick={handleOpenModalCreate}
            text={"Crear Material"}
          />
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
