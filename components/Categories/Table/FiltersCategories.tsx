import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import useScreenSize from "../../../hooks/useScreenSize";
import { useFiltersCategoriesContext } from "../context/FiltersCategoriesContext";
import FilterField from "../../Materials/Table/components/filters/FilterField";

const FiltersCategories = ({ handleFilter }: { handleFilter: any }) => {
  const {  isTablet } = useScreenSize();

  const {
    name,
    setName,
    clearFilters,
  } = useFiltersCategoriesContext();

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
    <Grid
      container
      gap={1}
      sx={{
        paddingInline: 1,
        textAlign: "center",
        paddingBlock: "10px",
        border: "1px solid  #E2E8F0",
      }}
    >
      <FilterField
        value={name}
        onChange={(e) => handleFilterChange("name", e.target.value)}
        placeholder="Nombre"
        size={11}
      />
     
    </Grid>
  );
};

export default FiltersCategories;
