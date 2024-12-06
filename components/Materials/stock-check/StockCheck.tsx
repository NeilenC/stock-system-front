import { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
  InputAdornment,
} from "@mui/material";
import { useMaterialStore } from "../../../zustand/materialStore";
import SectionComponent from "../../From-Nabvar/Navbar/Section-page/SectionComponent";
import inventory from "../../../public/inventory.png";
import {
  CustomTextField,
  FormLabelComponent,
} from "../../../commons/styled-components/CustomTextFields";
import CustomButton from "../../../commons/buttons-commons/CustomButton";
import { MaterialProps } from "../materialsProps";
import theme from "../../../themes/theme";
import { IconButton } from "rsuite";
import { ClearIcon } from "@mui/x-date-pickers";

const StockCheck = () => {
  const [distributionStock, setDistributionStock] = useState<any[]>([]);
  const [codeInputValue, setCodeInputValue] = useState<string>("");
  const [nameInputValue, setNameInputValue] = useState<string>("");
  const [filteredMaterials, setFilteredMaterials] = useState<MaterialProps[]>(
    []
  );
  const { materials, fetchMaterials } = useMaterialStore();

  // Fetch materials on component mount
  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  // Update the filtered materials whenever the inputs change
  useEffect(() => {
    if (codeInputValue.trim() === "" && nameInputValue.trim() === "") {
      setFilteredMaterials([]); // Clear list if inputs are empty
    } else {
      const filtered: any = materials.filter(
        (material) =>
          material.code.toLowerCase().includes(codeInputValue.toLowerCase()) &&
          material.name.toLowerCase().includes(nameInputValue.toLowerCase())
      );
      setFilteredMaterials(filtered);
    }
  }, [codeInputValue, nameInputValue, materials]);

  // Fetch distribution stock for a specific material
  const getDistributionStock = async (materialId: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/distribution-stock/material/${materialId}`
      );
      if (!response.ok) {
        throw new Error("Error fetching distribution stock");
      }
      const data = await response.json();
      setDistributionStock(data);
    } catch (error) {
      console.error("Failed to fetch distribution stock:", error);
    }
  };

  // Handle selection of a material
  const handleMaterialSelect = (material: MaterialProps) => {
    setCodeInputValue(material.code); // Actualiza el input con el código del material seleccionado
    setNameInputValue(material.name); // Opcional: actualiza también el nombre
    setFilteredMaterials([]); // Limpia la lista de materiales filtrados
    getDistributionStock(material.id); // Obtiene los datos del stock
  };

  // Función para reiniciar los filtros
  const resetFilters = () => {
    setCodeInputValue("");
    setNameInputValue("");
    setFilteredMaterials([]);
    setDistributionStock([]);
  };

  // Funciones para limpiar cada filtro individualmente
  const clearCodeInput = () => setCodeInputValue("");
  const clearNameInput = () => setNameInputValue("");

  return (
    <Box>
      <SectionComponent text="Consultas de Inventario" icon={inventory}>
        <CustomButton text="Limpiar Filtros" onClick={resetFilters} />
      </SectionComponent>
      <Box
        sx={{
          padding: "20px 40px",
          backgroundColor: theme.palette.primary.main,
          maxHeight:'100px',
          zIndex:0,

        }}
      >
        {/* Input for searching material codes and names */}
        <Grid container spacing={2} sx={{ marginBottom: 2 , }}>
          <Grid item xs={12} sm={6}>
          <FormLabelComponent>
            Código
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CustomTextField
                variant="outlined"
                value={codeInputValue}
                onChange={(e) => setCodeInputValue(e.target.value)}
                fullWidth
                placeholder="Escribe el cóbido del material"
                sx={{
                  bgcolor: "white",
                  height: "43px",
                  borderRadius: "8px",
                  marginRight: 1, // Add spacing between the input and the icon
                }}
              />
                <ClearIcon  onClick={clearCodeInput} sx={{ padding: "8px" }}/>
            </Box>
            </FormLabelComponent>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabelComponent>
              Nombre
              <Box sx={{ display: "flex", alignItems: "center" }}>
              <CustomTextField
                variant="outlined"
                value={nameInputValue}
                onChange={(e) => setNameInputValue(e.target.value)}
                fullWidth
                placeholder="Escribe el nombre del material"
                sx={{
                  bgcolor: "white",
                  height: "43px",
                  borderRadius: "8px",
                  marginRight: 1, // Add spacing between the input and the icon
                }}
              />
                <ClearIcon onClick={clearNameInput} sx={{ padding: "8px" }} />
            </Box>
            </FormLabelComponent>
          </Grid>
        </Grid>
        {/* Filtered materials list */}
        {(codeInputValue.trim() !== "" || nameInputValue.trim() !== "") &&
          filteredMaterials.length > 0 && (
            <List
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                maxHeight: "400px",
                overflowY: "auto",
                boxShadow: 1,
                marginBottom: 2,
                bgcolor:'white',
                p:0,
                zIndex:1,

              }}
            >

              {filteredMaterials.map((material, index) => (
                <Box key={index}>
                  <ListItem
                    button
                    onClick={() => handleMaterialSelect(material)}
                  >
                    <ListItemText
                      primary={material.code}
                      secondary={material.name}
                    />
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>
          )}

        {/* {(codeInputValue.trim() !== "" || nameInputValue.trim() !== "") && filteredMaterials.length === 0 && (
    <Typography variant="body2" sx={{ marginTop: 1, color: "gray" }}>
      No se encontraron materiales con los filtros aplicados.
    </Typography>
  )} */}
      </Box>

      {/* Display distribution stock results */}
      <Box sx={{ marginTop: 4 }}>
        {distributionStock.length > 0 ? (
          <Box sx={{ paddingInline: "24px" }}>
            <Typography
              variant="h6"
              sx={{ marginBottom: 2, fontWeight: "bold" }}
            >
              Distribución del Material Seleccionado
            </Typography>
            <Box>
              <TableContainer
                component={Paper}
                sx={{
                  overflow: "hidden",
                  maxHeight: 600,

                }}
              >
                <Table sx={{ minWidth: 650 }}>
                  <TableHead
                  
                  >
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "#333",
                          backgroundColor: "#f4f4f4",
                        }}
                      >
                        Ubicación
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: "#f4f4f4",
                        }}
                      >
                        Cantidad
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {distributionStock.map((stock, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:nth-of-type(even)": { backgroundColor: "#fafafa" },
                        }}
                      >
                        <TableCell
                          sx={{
                            color: "#555",
                            padding: "12px",
                          }}
                        >
                          {stock.sector_id.name}
                        </TableCell>
                        <TableCell
                          sx={{
                            padding: "12px",
                          }}
                        >
                          {stock.storaged_stock}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        ) : (
          codeInputValue === "" &&
          nameInputValue === "" && (
            <Typography variant="body1" sx={{ color: "gray", margin: "40px" }}>
             Por favor seleccione un valor.
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
};

export default StockCheck;
