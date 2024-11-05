import { useState } from "react";
import SectionComponent from "../../From-Nabvar/Navbar/Section-page/SectionComponent";
import { Box } from "@mui/material";
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

const MainComponent = () => {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const {currentMaterials, handleFilter } = useMaterialsContext();
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
  
  // Función para exportar los materiales a Excel
  const exportToExcel = () => {
    // Define los datos y el encabezado de la tabla
    const worksheetData = currentMaterials.map((material:any) => ({
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

  // Function to print the materials table
  const printTable = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return; // Handle the case where the popup is blocked

    printWindow.document.write(`
      <html>
        <head>
          <title>Imprimir Materiales</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Materiales</h1>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Color</th>
                <th>Ancho</th>
                <th>Alto</th>
                <th>Peso</th>
                <th>Profundidad</th>
                <th>Precio</th>
                <th>Observaciones</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              ${currentMaterials.map(material => `
                <tr>
                  <td>${material.code}</td>
                  <td>${material.category?.category_name}</td>
                  <td>${material.actual_stock}</td>
                  <td>${material.color}</td>
                  <td>${material.width}</td>
                  <td>${material.height}</td>
                  <td>${material.weight}</td>
                  <td>${material.depth}</td>
                  <td>${material.price}</td>
                  <td>${material.observations}</td>
                  <td>${material.description}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close(); // Necessary for IE >= 10
    printWindow.focus(); // Necessary for IE >= 10

    printWindow.print();
    printWindow.close(); // Optional: close the print window after printing
  };
  return (
    <>
      <SectionComponent icon={materialsicon} text={"Materiales"}>
        <Box display={"flex"} gap={2}>
        <CustomButton
        icon={print}
            onClick={printTable}
            // text={"Imprimir"}

            sx={{
              backgroundColor: theme.palette.primary.light,
              color:'grey',
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              width:'50px'
            }}
          />
        <CustomButton
            onClick={exportToExcel}
            text={"Exportar a Excel"}
            icon={download}
            sx={{
              backgroundColor: '#1d6f42',
              color: "white",
              padding: "8px 16px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          />


                    <CustomButton
                    // icon={clear}
            onClick={clearAllFilters}
            text={"Limpiar Filtros"}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.01)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              color: theme.palette.primary.dark,
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
