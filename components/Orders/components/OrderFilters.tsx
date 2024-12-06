import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import useScreenSize from "../../../hooks/useScreenSize";
import { useOrderFiltersContext } from "../context/OrderFiltersContext";
import FilterField from "../../Materials/Table/components/filters/FilterField";
import CustomButton from "../../../commons/buttons-commons/CustomButton";

const OrderFilters = ({ handleFilter }: { handleFilter: any }) => {
  const { isTablet } = useScreenSize();

  const {
    material,
    state,
    responsible,
    orderDate,
    activity,
    setState,
    setmaterial,
    setResponsible,
    setOrderDate,
    setActivity,
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
      case "activity":
        setActivity(value);
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

  const clearAllFilters = () => {
    clearFilters();
    handleFilter({
      material: "",
      state: "",
      responsible: "",
      orderDate: "",
      activity: "",
    });
  };

  return (
    <Grid
      container
      gap={isTablet ? 5 : 12}
      sx={{
        paddingInline: 3,
        textAlign: "center",
        paddingBlock: "10px",
        border: "1px solid  #E2E8F0",
      }}
    >
      {/* <FilterField
        value={material}
        onChange={(e) => handleFilterChange("material", e.target.value)}
        placeholder="material"
        size={1.3}
      /> */}

      <FilterField
        value={orderDate}
        onChange={(e) => handleFilterChange("orderDate", e.target.value)}
        placeholder="Tipo"
        size={isTablet ? 1 : 1.6}
        maxLength={15}
      />
      <FilterField
        value={activity}
        onChange={(e) => handleFilterChange("activity", e.target.value)}
        placeholder="Actividad"
        size={1.3}
        maxLength={15}
      />

      <FilterField
        value={state}
        onChange={(e) => handleFilterChange("state", e.target.value)}
        placeholder="Estado"
        size={1.6}
        maxLength={15}
      />

      <FilterField
        value={responsible}
        onChange={(e) => handleFilterChange("responsible", e.target.value)}
        placeholder="responsable"
        size={isTablet ? 1 : 2}
        maxLength={15}
      />
      <Grid
        item
        xs={12}
        sm={isTablet ? 4 : 2.6}
        container
        justifyContent="flex-end"
        alignItems="center"
      >
        <CustomButton
          text="Limpiar Filtros"
          onClick={clearAllFilters}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.01)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            color: "#5f6368",
            padding: "8px 16px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            width: isTablet ? "150px" : "200px",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default OrderFilters;
