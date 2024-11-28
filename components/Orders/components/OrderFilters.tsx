import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import useScreenSize from "../../../hooks/useScreenSize";
import { useOrderFiltersContext } from "../context/OrderFiltersContext";
import FilterField from "../../Materials/Table/components/filters/FilterField";

const OrderFilters = ({ handleFilter }: { handleFilter: any }) => {
  const { isTablet } = useScreenSize();

  const {
material,
    state,
    responsible,
    orderDate,
    setState,
    setmaterial,
    setResponsible,
    setOrderDate,
    clearFilters,
  } = useOrderFiltersContext();

  const handleFilterChange = (field: string, value: any) => {
    switch (field) {
      case "material":
        setmaterial(value);
        break;
      case "state":
        setState(value);
        break;
      case "orderDate":
        setOrderDate(value);
        break;
      case "responsible":
        setResponsible(value);
        break;
      case "responsible":
        setResponsible(value);
        break;
      case "state":
        setState(value);
        break;
      default:
        break;
    }

    // Collect current filter values and update
    const filters = {
        material,
      orderDate: orderDate,
      state,
      responsible,
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
        value={material}
        onChange={(e) => handleFilterChange("material", e.target.value)}
        placeholder="material"
        size={1.3}
      />
      <FilterField
        value={state}
        onChange={(e) => handleFilterChange("state", e.target.value)}
        placeholder="Estado"
        size={1.6}
        maxLength={15}
      />
      <FilterField
        value={orderDate}
        onChange={(e) => handleFilterChange("orderDate", e.target.value)}
        placeholder="Tipo"
        size={isTablet ? 1 : 1.1}
        maxLength={15}
      />

      <FilterField
        value={responsible}
        onChange={(e) => handleFilterChange("responsible", e.target.value)}
        placeholder="responsable"
        size={isTablet ? 1 : 1.3}
        maxLength={15}
      />

    </Grid>
  );
};

export default OrderFilters;
