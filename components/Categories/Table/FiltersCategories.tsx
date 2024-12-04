import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import useScreenSize from "../../../hooks/useScreenSize";
import { useFiltersCategoriesContext } from "../context/FiltersCategoriesContext";
import FilterField from "../../Materials/Table/components/filters/FilterField";
import SearchIcon from "@mui/icons-material/Search";
import { useMaterialsContext } from "../../Materials/Table/context/MaterialsContextProps";
import CustomButton from "../../../commons/buttons-commons/CustomButton";
import reset from '../../../public/reset.png'
import ImageToIcon from "../../../commons/styled-components/IconImages";

const FiltersCategories = ({ handleFilter }: { handleFilter: any }) => {
  const { isTablet } = useScreenSize();
  const { itemsPerPage, updateItemsPerPage } = useMaterialsContext();
  const handleItemsPerPageChange = (event: any) => {
    const value = parseInt(event.target.value, 10); //
    updateItemsPerPage(value);
  };

  const { name, setName, clearFilters } = useFiltersCategoriesContext();
  const clearAllFilters = () => {
    clearFilters();
    handleFilter({
      name: "",
     
    });
  };

  // Function to handle changes to any filter
  const handleFilterChange = (field: string, value: any) => {
    // Update the corresponding state
    switch (field) {
      case "name":
        setName(value);
        break;
      default:
        break;
    }

    // Collect current filter values and update
    const filters = {
      name,
    };
    handleFilter({ ...filters, [field]: value });
  };

  return (
    <Box sx={{ padding: "10px 16px" }}>
      {/* Contenedor general para los filtros y select */}
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        {/* Selector de items por página alineado a la izquierda */}
        <Grid item>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Select
              labelId="items-per-page-label"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              label="Items por página"
              sx={{ height: "45px", mr: 2 }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={40}>40</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
            <Typography variant="body1">Registros por página</Typography>
          </Box>
        </Grid>

        {/* Buscador alineado al lado derecho */}
        <Grid
          item
          xs
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" sx={{ mr: 2 }}>
            Buscar
          </Typography>
          <FilterField
            value={name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            placeholder="Nombre"
            size={2}
            sx={{
              display: "flex",
              alignItems: "center", // Alineación vertical
              mr:2
            }}
          />
          <ImageToIcon
          icon={reset}
            w={30} h={30}
            onClick={clearAllFilters}
            sx={{pt:0.5, cursor:'pointer'}}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FiltersCategories;
