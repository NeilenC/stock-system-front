import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import FilterField from "./FilterField";
import { useFiltersContext } from "../../context/FiltersContext";
import useScreenSize from "../../../../../hooks/useScreenSize";

const Filters = ({ handleFilter }: { handleFilter: any }) => {
  const {  isTablet } = useScreenSize();

  const {
    code,
    category,
    description,
    weight,
    color,
    height,
    depth,
    stock,
    observations,
    price,
    width,
    setCode,
    setCategory,
    setDescription,
    setWeight,
    setColor,
    setHeight,
    setDepth,
    setStock,
    setObservations,
    setPrice,
    setWidth,
    clearFilters,
  } = useFiltersContext();

  // Function to handle changes to any filter
  const handleFilterChange = (field: string, value: any) => {
    // Update the corresponding state
    switch (field) {
      case "code":
        setCode(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "weight":
        setWeight(value);
        break;
      case "color":
        setColor(value);
        break;
      case "height":
        setHeight(value);
        break;
      case "depth":
        setDepth(value);
        break;
      case "stock":
        setStock(value);
        break;
      case "observations":
        setObservations(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "width":
        setWidth(value);
        break;
      default:
        break;
    }

    // Collect current filter values and update
    const filters = {
      code,
      category,
      description,
      weight,
      color,
      height,
      depth,
      stock,
      observations,
      price,
      width,
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
        value={code}
        onChange={(e) => handleFilterChange("code", e.target.value)}
        placeholder="Código"
        size={1.1}
      />
      <FilterField
        value={category}
        onChange={(e) => handleFilterChange("category", e.target.value)}
        placeholder="Categoría"
        size={isTablet? 1 : 1.2}
        maxLength={15}
      />
      <FilterField
        value={description}
        onChange={(e) => handleFilterChange("description", e.target.value)}
        placeholder="Descripción"
        size={1.5}
        maxLength={15}
      />
      <FilterField
        value={weight}
        onChange={(e) => handleFilterChange("weight", e.target.value)}
        placeholder="Peso"
        size={0.8}
      />
      <FilterField
        value={color}
        onChange={(e) => handleFilterChange("color", e.target.value)}
        placeholder="Color"
        size={1.2}
      />
      <FilterField
        value={height}
        onChange={(e) => handleFilterChange("height", e.target.value)}
        placeholder="Altura"
        size={0.7}
      />

      <FilterField
        value={depth}
        onChange={(e) => handleFilterChange("depth", e.target.value)}
        placeholder="Profundidad"
        size={0.8}
      />
      <FilterField
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
        size={isTablet ? 1 :0.8}
      />
    </Grid>
  );
};

export default Filters;
