import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import useScreenSize from "../../../../hooks/useScreenSize";
import { useFiltersActivContext } from "../context/ActivityFiltersContext";
import FilterField from "../../../Materials/Table/components/filters/FilterField";

const ActivityFilters = ({ handleFilter }: { handleFilter: any }) => {
  const { isTablet } = useScreenSize();

  const {
    activityName,
    clientPhone,
    clientEmail,
    typeActivity,
    state,
    responsible,
    initialDate,
    endDate,
    cwaNumber,
    typeOfContract,
    setActivityName,
    setClientPhone,
    setClientEmail,
    setTypeActivity,
    setState,
    setResponsible,
    setInitialDate,
    setEndDate,
    setCWANumber,
    setTypeOfContract,
    clearFilters,
  } = useFiltersActivContext();

  // Function to handle changes to any filter
  const handleFilterChange = (field: string, value: any) => {
    // Update the corresponding state
    switch (field) {
      case "activityName":
        setActivityName(value);
        break;
      case "state":
        setState(value);
        break;
      case "typeActivity":
        setTypeActivity(value);
        break;
      case "responsible":
        setResponsible(value);
        break;
      case "initialDate":
        setInitialDate(value);
        break;
      case "endDate":
        setEndDate(value);
        break;
      case "cwaNumber":
        setCWANumber(value);
        break;
      case "clientEmail":
        setClientEmail(value);
        break;
      case "typeOfContract":
        setTypeOfContract(value);
        break;
      // case "price":
      //   setPrice(value);
      //   break;
      // case "width":
      //   setWidth(value);
      //   break;
      default:
        break;
    }

    // Collect current filter values and update
    const filters = {
      activityName,
      clientPhone,
      clientEmail,
      typeActivity,
      state,
      responsible,
      initialDate,
      endDate,
      cwaNumber,
      typeOfContract,
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
        value={activityName}
        onChange={(e) => handleFilterChange("activityName", e.target.value)}
        placeholder="Actividad"
        size={1.7}
      />
      <FilterField
        value={state}
        onChange={(e) => handleFilterChange("state", e.target.value)}
        placeholder="Estado"
        size={1.3}
        maxLength={15}
      />
      <FilterField
        value={typeActivity}
        onChange={(e) => handleFilterChange("typeActivity", e.target.value)}
        placeholder="Tipo"
        size={isTablet ? 1 : 1.2}
        maxLength={15}
      />
      <FilterField
        value={cwaNumber}
        onChange={(e) => handleFilterChange("cwaNumber", e.target.value)}
        placeholder="Número CWA"
        size={0.8}
      />

      <FilterField
        value={typeOfContract}
        onChange={(e) => handleFilterChange("typeOfContract", e.target.value)}
        placeholder="Tipo de  contrato"
        size={1.5}
      />




      <FilterField
        value={responsible}
        onChange={(e) => handleFilterChange("responsible", e.target.value)}
        placeholder="Responsable"
        size={0.8}
      />
      <FilterField
        value={initialDate}
        onChange={(e) => handleFilterChange("initialDate", e.target.value)}
        placeholder="Fecha Inicio"
        size={1.5}
      />
      <FilterField
        value={endDate}
        onChange={(e) => handleFilterChange("endDate", e.target.value)}
        placeholder="Fecha Fin"
        size={1.5}
      />

      {/* <FilterField
        value={stock}
        onChange={(e) => handleFilterChange("stock", e.target.value)}
        placeholder="Cantidad"
        size={0.7}
      />

      <FilterField
        value={width}
        onChange={(e) => handleFilterChange("width", e.target.value)}
        placeholder="Ancho"
        size={0.6}
      />
      <FilterField
        value={observations}
        onChange={(e) => handleFilterChange("observations", e.target.value)}
        placeholder="Observaciones"
        size={isTablet ? 1.2 : 1.3}
      />
      <FilterField
        value={price}
        onChange={(e) => handleFilterChange("price", e.target.value)}
        placeholder="Precio"
        size={isTablet ? 1 : 0.8}
      /> */}
    </Grid>
  );
};

export default ActivityFilters;
