import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import Filters from "./Filters";
import TableHeader from "./TableHeader";
import TableRowItem from "./TableRowItem";
import Pagination from "./Pagination";
import { MaterialProps } from "../materialsProps";

const MaterialsTable = ({ materials }: any) => {
  const [filteredMaterials, setFilteredMaterials] =
    useState<MaterialProps[]>(materials);

  // Implement filter logic in a separate function
  const handleFilter = (filters: {
    code: string;
    stock: string;
    color: string;
    width: string;
    height: string;
    depth: string;
    price: string;
    observations: string;
    description: string;
  }) => {
    const {
      code,
      stock,
      color,
      width,
      height,
      depth,
      price,
      observations,
      description,
    } = filters;
    let filtered = materials;

    if (description) {
      filtered = filtered.filter((material: MaterialProps) =>
        material.name.toLowerCase().includes(description.toLowerCase())
      );
    }

    if (code) {
      filtered = filtered.filter((material: MaterialProps) =>
        material.code.toLowerCase().includes(code.toLowerCase())
      );
    }

    if (stock) {
      filtered = filtered.filter(
        (material: MaterialProps) => material.actual_stock >= parseFloat(stock)
      );
    }

    if (color) {
      filtered = filtered.filter((material: MaterialProps) =>
        material.color.toLowerCase().includes(color.toLowerCase())
      );
    }

    if (width) {
      filtered = filtered.filter(
        (material: MaterialProps) => material.width >= parseFloat(width)
      );
    }

    if (height) {
      filtered = filtered.filter(
        (material: MaterialProps) => material.height >= parseFloat(height)
      );
    }

    if (depth) {
      filtered = filtered.filter(
        (material: MaterialProps) => material.depth >= parseFloat(depth)
      );
    }

    if (price) {
      filtered = filtered.filter(
        (material: MaterialProps) => material.price <= parseFloat(price)
      );
    }

    if (observations) {
      filtered = filtered.filter((material: MaterialProps) =>
        material.observations.toLowerCase().includes(observations.toLowerCase())
      );
    }

    setFilteredMaterials(filtered);
  };

  return (
    <>
      <Box sx={{ pb:2 }}>
        <Grid container >
          <TableHeader />
          <Filters onFilter={handleFilter} />

          {filteredMaterials.map((material: any) => (
            <TableRowItem key={material.id} material={material} />
          ))}
        </Grid>
        <Pagination />
      </Box>
    </>
  );
};

export default MaterialsTable;
