import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  FormHelperText,
  Box,
  FormControl,
} from "@mui/material";
import { useSectorStore } from "../../../zustand/sectorsStore";
import { FormLabelComponent } from "../../../commons/styled-components/CustomTextFields";
import { CustomTextFieldMaterial } from "../../Materials/StyledMaterial";
import CustomNumberInput from "../../../commons/styled-components/CustomNumberInput";
import { SectorType } from "../enum";
import theme from "../../../themes/theme";

const SectorFormCreate = () => {
  const { sectorData, setSectorData, resetSectorData } =
    useSectorStore();
  const { name, square_meters, number_of_bathrooms, description, sector, is_active } =
    sectorData;

  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    resetSectorData();
  }, []);

  const handleSubmit = () => {
    setSubmitAttempted(true);

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

    // setErrors(newErrors);

    const formData = {
      name,
      square_meters,
      number_of_bathrooms,
      description,
      sector,
      // is_active
    };

    setSectorData(formData);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <FormControl fullWidth margin="normal" required>
        <FormLabelComponent htmlFor="nombre" >Nombre</FormLabelComponent>
        <CustomTextFieldMaterial
          id="nombre"
          fullWidth
          value={sectorData.name}
          onChange={(e) => setSectorData({ name: e.target.value })}
        />
        {submitAttempted && !name && (
          <FormHelperText error>El nombre es requerido</FormHelperText>
        )}
      </FormControl>

      <Box sx={{ display: "flex", gap: "16px" }}>
        <FormControl
          sx={{ flex: 1 }}
          margin="normal"
          required
          error={submitAttempted && !square_meters}
        >
          <FormLabelComponent htmlFor="metros-cuadrados">
            Metros cuadrados
          </FormLabelComponent>
          <CustomNumberInput
            id="metros-cuadrados"
            placeholder="Metros cuadrados"
            fullWidth
            value={square_meters}
            onChange={(e:any) =>
              setSectorData({
                square_meters:
                  e.target.value === "" ? 0 : Number(e.target.value),
              })
            }
          />

          {submitAttempted && !square_meters && (
            <FormHelperText error>
              Los metros cuadrados son requeridos
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          sx={{ flex: 1 }}
          margin="normal"
          required
          error={submitAttempted && !number_of_bathrooms}
        >
          <FormLabelComponent htmlFor="cantidad-banos">
            Cantidad de baños
          </FormLabelComponent>
          <CustomNumberInput
            id="cantidad-banos"
            placeholder="Cantidad de baños"
            fullWidth
            value={number_of_bathrooms}
            onChange={(e: any) =>
              setSectorData({
                number_of_bathrooms:
                  e.target.value === "" ? 0 : Number(e.target.value),
              })
            }
            InputProps={{
              inputProps: {
                style: { appearance: "textfield" },
              },
              sx: {
                "& input[type=number]": {
                  MozAppearance: "textfield", // Para Firefox
                },
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none",
                    margin: 0,
                  },
              },
            }}
          />

          {submitAttempted && !number_of_bathrooms && (
            <FormHelperText error>
              La cantidad de baños es requerida
            </FormHelperText>
          )}
        </FormControl>
      </Box>

      <FormControl fullWidth margin="normal">
        <FormLabelComponent htmlFor="sector">Categoría</FormLabelComponent>
        <CustomTextFieldMaterial
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
        </CustomTextFieldMaterial>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabelComponent htmlFor="descripcion">
          Descripción
        </FormLabelComponent>
        <TextField
            margin="dense"
          id="descripcion"
          fullWidth
          multiline
            rows={3}
          value={description}
          onChange={(e) => setSectorData({ description: e.target.value })}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "5px",
              border: `1px solid ${theme.palette.info.light}`,
            },
          }}
        />
      </FormControl>
    </form>
  );
};

export default SectorFormCreate;
