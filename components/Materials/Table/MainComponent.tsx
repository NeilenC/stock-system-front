import { useState } from "react";
import SectionComponent from "../../From-Nabvar/Navbar/Section-page/SectionComponent";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import MaterialsTable from "./MaterialsTable";
import CustomButton from "../../../commons/buttons-commons/CustomButton";
import materialsicon from "../../../public/materials.png";
import theme from "../../../themes/theme";
import * as XLSX from "xlsx";
import download from "../../../public/download.png";
import clear from "../../../public/reset.png";
import print from "../../../public/print.png";
import { useFiltersContext } from "./context/FiltersContext";
import { useMaterialStore } from "../../../zustand/materialStore";
import { useMaterialsContext } from "./context/MaterialsContextProps";
import Toast from "../../../commons/Toast";
import { printTable } from "../../../commons/template/printTable";
import { exportToExcel } from "../../../commons/template/exportExcel";
import useScreenSize from "../../../hooks/useScreenSize";

const MainComponent = () => {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const { currentMaterials, handleFilter } = useMaterialsContext();
  const { clearFilters } = useFiltersContext();
  const { materials } = useMaterialStore();
  const clearAllFilters = () => {
    clearFilters();
    handleFilter({
      code: "",
      category: "",
      description: "",
      weight: "",
      color: "",
      height: "",
      depth: "",
      stock: "",
      observations: "",
      price: "",
      width: "",
    });
  };
  const { itemsPerPage, updateItemsPerPage } = useMaterialsContext();
  const handleItemsPerPageChange = (event: any) => {
    const value = parseInt(event.target.value, 10); // Parse selected value as number
    updateItemsPerPage(value); // Update items per page in context
  };

 const handleExportExcel = () => {
  exportToExcel(currentMaterials)
 }
  const handlePrint = () => {
    printTable(currentMaterials); // Llama a la función con los datos necesarios
  };
  
  
  const { isTablet } = useScreenSize();
  return (
    <>
      <SectionComponent icon={materialsicon} text={"Materiales"}>
        <Box display={"flex"} gap={2}>
          <CustomButton
            icon={print}
            onClick={() => handlePrint()}
            // text={"Imprimir"}

            sx={{
              backgroundColor: theme.palette.primary.light,
              color: "grey",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              width: isTablet ? "40px" : "50px", 
            }}
          />
          <CustomButton
            onClick={() => handleExportExcel()}
            text={isTablet ? "" : "Exportar a Excel"}
            icon={download}
            sx={{
              backgroundColor: "#1d6f42",
              color: "white",
              padding: "8px 16px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              width: isTablet ? "40px" : "200px", 

            }}
          />

          <CustomButton
            // icon={clear}
            onClick={clearAllFilters}
            text={"Limpiar Filtros"}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.01)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              color: "#5f6368",
              padding: "8px 16px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              width: isTablet ? "150px" : '200px', 
            }}
          />
          <CustomButton
            onClick={handleOpenModalCreate}
            text={"Crear Material"}
           sx={ {width: isTablet ? "150px" : '200px', }}

          />
        </Box>
      </SectionComponent>
      <Box sx={{ p: "  10px 0px 0px  16px" , display:'flex'}}>
        <Select
          labelId="items-per-page-label"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          label="Items por página"
          sx={{ height: '45px' }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
        <Typography variant='body1'sx={{alignContent:'center', pl:2}}>Registros por página</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center", 
          paddingBlock: "10px",
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
          <MaterialsTable
            initialMaterials={materials}
            openModalCreate={openModalCreate}
            setOpenModalCreate={setOpenModalCreate}
          />
        </Box>
      </Box>

    
    </>
  );
};

export default MainComponent;
