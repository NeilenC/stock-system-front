import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  FormHelperText,
  Box,
  FormControl,
} from "@mui/material";
import { SectorType } from "./enum";
import { FormLabelComponent } from "../../commons/styled-components/CustomTextFields";
import { useSectorStore } from "../../zustand/sectorsStore";

const SectorFormCreate = () => {
  const { sectorData, setSectorData, resetSectorData } = useSectorStore();
  const { name, square_meters, number_of_bathrooms, description, sector } =
    sectorData;

  useEffect(() => {
    resetSectorData();
  }, []);

  const handleSubmit = () => {
    let isValid = true;
    let newErrors = {
      name: "",
      square_meters: "",
      number_of_bathrooms: "",
      sector: "",
    };

    if (!name) {
      newErrors.name = "El nombre es requerido";
      isValid = false;
    }

    if (!square_meters) {
      newErrors.square_meters = "Los metros cuadrados son requeridos";
      isValid = false;
    }

    if (!number_of_bathrooms) {
      newErrors.number_of_bathrooms = "La cantidad de baños es requerida";
      isValid = false;
    }

    if (!sector) {
      newErrors.sector = "El sector es requerido";
      isValid = false;
    }

    if (!isValid) {
      console.error("Validation Errors:", newErrors);
      return; 
    }

    const formData = {
      name,
      square_meters: Number(square_meters),
      number_of_bathrooms: Number(number_of_bathrooms),
      description,
      sector,
    };

    setSectorData(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal" required>
        <FormLabelComponent htmlFor="nombre">Nombre</FormLabelComponent>
        <TextField
          id="nombre"
          placeholder="Nombre"
          fullWidth
          value={sectorData.name}
          onChange={(e) => setSectorData({ name: e.target.value })}
        />
        {!name ? (
          <FormHelperText error>El nombre es requerido</FormHelperText>
        ) : (
          <></>
        )}
      </FormControl>

      <Box sx={{ display: "flex", gap: "16px" }}>
        <FormControl
          sx={{ flex: 1 }}
          margin="normal"
          required
          error={!square_meters}
        >
          <FormLabelComponent htmlFor="metros-cuadrados">
            Metros cuadrados
          </FormLabelComponent>
          <TextField
            id="metros-cuadrados"
            placeholder="Metros cuadrados"
            type="number"
            fullWidth
            value={square_meters}
            onChange={(e) =>
              setSectorData({ square_meters: Number(e.target.value) })
            }
          />
          {!square_meters && (
            <FormHelperText error>
              Los metros cuadrados son requeridos
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          sx={{ flex: 1 }}
          margin="normal"
          required
          error={!number_of_bathrooms}
        >
          <FormLabelComponent htmlFor="cantidad-banos">
            Cantidad de baños
          </FormLabelComponent>
          <TextField
            id="cantidad-banos"
            placeholder="Cantidad de baños"
            type="number"
            fullWidth
            value={number_of_bathrooms}
            onChange={(e) =>
              setSectorData({ number_of_bathrooms: Number(e.target.value) })
            }
          />
          {!number_of_bathrooms && (
            <FormHelperText error>
              La cantidad de baños es requerida
            </FormHelperText>
          )}
        </FormControl>
      </Box>

      <FormControl fullWidth margin="normal">
        <FormLabelComponent htmlFor="sector">Categoría</FormLabelComponent>
        <TextField
          id="sector"
          placeholder="Sector"
          select
          fullWidth
          value={sector}
          onChange={(e) =>
            setSectorData({ sector: e.target.value as SectorType })
          }
        >
          {Object.values(SectorType).map((option, index) => (
            <MenuItem key={`${option}-${index}`} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabelComponent htmlFor="descripcion">
          Descripción
        </FormLabelComponent>
        <TextField
          id="descripcion"
          placeholder="Descripción"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setSectorData({ description: e.target.value })}
        />
      </FormControl>
    </form>
  );
};

export default SectorFormCreate;
