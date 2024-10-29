import React, { useEffect } from "react";
import {
  TextField,
  MenuItem,
  FormHelperText,
  Box,
  FormControl,
} from "@mui/material";
import { FormLabelComponent } from "../../../commons/styled-components/CustomTextFields";
import { SectorType } from "../enum";
import { useSectorStore } from "../../../zustand/sectorsStore";


const SectorEditForm = ({
  onSubmit,
  error,
  handleClose,
  sectorId,
}: {
  onSubmit?: (sectorData: any) => void;
  error?: string;
  handleClose: () => void;
  sectorId: number | null;
}) => {
  const { sectorData, setSectorData, resetSectorData } = useSectorStore();
  const [errors, setErrors] = React.useState({
    name: "",
    square_meters: "",
    number_of_bathrooms: "",
    sector: "",
  });

  useEffect(() => {
    if (sectorId) {
      fetchSectorData(sectorId);
    }
    // Resetea el formulario cuando el componente se desmonta
    return () => resetSectorData();
  }, [sectorId]);

  const fetchSectorData = async (sectorId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/sectors/${sectorId}`
      );
      const data = await response.json();
      setSectorData({
        name: data.name,
        square_meters: data.square_meters.toString(),
        number_of_bathrooms: data.number_of_bathrooms.toString(),
        sector: data.sector,
        description: data.description,
      });
    } catch (error) {
      console.error("Error fetching sector data:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {
      name: "",
      square_meters: "",
      number_of_bathrooms: "",
      sector: "",
    };

    if (!sectorData.name) {
      newErrors.name = "El nombre es requerido";
      isValid = false;
    }
    if (!sectorData.square_meters) {
      newErrors.square_meters = "Los metros cuadrados son requeridos";
      isValid = false;
    }
    if (!sectorData.number_of_bathrooms) {
      newErrors.number_of_bathrooms = "La cantidad de baños es requerida";
      isValid = false;
    }
    if (!sectorData.sector) {
      newErrors.sector = "El sector es requerido";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    if (onSubmit) {
      onSubmit({
        ...sectorData,
        square_meters: Number(sectorData.square_meters),
        number_of_bathrooms: Number(sectorData.number_of_bathrooms),
      });
    }
  };
  const handleChange =
    (field: keyof typeof sectorData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "square_meters" || field === "number_of_bathrooms"
          ? Number(e.target.value)
          : e.target.value;

      setSectorData({ [field]: value });
    };

  const renderHelperText = (field: keyof typeof errors) => {
    const errorText = errors[field];
    return errorText ? (
      <FormHelperText sx={{ lineHeight: "5px" }} error>
        {errorText}
      </FormHelperText>
    ) : (
      <div style={{ padding: "5px" }}></div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal" required error={!!errors.name}>
        <FormLabelComponent htmlFor="nombre">Nombre</FormLabelComponent>
        <TextField
          id="nombre"
          fullWidth
          value={sectorData.name}
          onChange={handleChange("name")}
        />
        {renderHelperText("name")}
      </FormControl>

      <Box sx={{ display: "flex", gap: "16px" }}>
        <FormControl
          sx={{ flex: 1 }}
          margin="normal"
          required
          error={!!errors.square_meters}
        >
          <FormLabelComponent htmlFor="metros-cuadrados">
            Metros cuadrados
          </FormLabelComponent>
          <TextField
            id="metros-cuadrados"
            type="number"
            fullWidth
            value={sectorData.square_meters}
            onChange={handleChange("square_meters")}
          />
          {renderHelperText("square_meters")}
        </FormControl>

        <FormControl
          sx={{ flex: 1 }}
          margin="normal"
          required
          error={!!errors.number_of_bathrooms}
        >
          <FormLabelComponent htmlFor="cantidad-banos">
            Cantidad de baños
          </FormLabelComponent>
          <TextField
            id="cantidad-banos"
            type="number"
            fullWidth
            value={sectorData.number_of_bathrooms}
            onChange={handleChange("number_of_bathrooms")}
          />
          {renderHelperText("number_of_bathrooms")}
        </FormControl>
      </Box>

      <FormControl fullWidth margin="normal">
        <FormLabelComponent htmlFor="sector">Categoría</FormLabelComponent>
        <TextField
          id="sector"
          select
          fullWidth
          value={sectorData.sector}
          onChange={(e) => handleChange("sector")(e as any)}
        >
          {Object.values(SectorType).map((option, index) => (
            <MenuItem key={`${option}-${index}`} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        {renderHelperText("sector")}
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabelComponent htmlFor="descripcion">
          Descripción
        </FormLabelComponent>
        <TextField
          id="descripcion"
          fullWidth
          multiline
          rows={3}
          value={sectorData.description}
          onChange={handleChange("description")}
        />
      </FormControl>
    </form>
  );
};

export default SectorEditForm;
