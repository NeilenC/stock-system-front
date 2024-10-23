import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  FormHelperText,
  Box,
  FormControl,
} from "@mui/material";
import { SectorType } from "./enum";
import CustomButton from "../../commons/buttons-commons/CustomButton";
import { FormLabelComponent } from "../../commons/styled-components/CustomTextFields";

const SectorEditForm = ({
  onSubmit,
  error,
  handleClose,
  sectorId,
}: {
  onSubmit?: (formData: any) => void;
  error?: string;
  handleClose: () => void;
  sectorId: number | null;
}) => {
  const [name, setName] = useState("");
  const [squareMeters, setSquareMeters] = useState("");
  const [bathroomsCount, setBathroomsCount] = useState("");
  const [sector, setSector] = useState<SectorType | "">("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    square_meters: "",
    number_of_bathrooms: "",
    sector: "",
  });

  // Función para obtener los datos del sector
  const fetchSectorData = async (sectorId: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/sectors/${sectorId}`); // Cambia esta URL según tu API
      const data = await response.json();
      setName(data.name);
      setSquareMeters(data.square_meters.toString());
      setBathroomsCount(data.number_of_bathrooms.toString());
      setSector(data.sector);
      setDescription(data.description);
    } catch (error) {
      console.error("Error fetching sector data:", error);
    }
  };

  useEffect(() => {
    if (sectorId) {
      fetchSectorData(sectorId);
    }
  }, [sectorId]);

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

    if (!squareMeters) {
      newErrors.square_meters = "Los metros cuadrados son requeridos";
      isValid = false;
    }

    if (!bathroomsCount) {
      newErrors.number_of_bathrooms = "La cantidad de baños es requerida";
      isValid = false;
    }

    if (!sector) {
      newErrors.sector = "El sector es requerido";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    const formData = {
      id:sectorId,
      name,
      square_meters: Number(squareMeters),
      number_of_bathrooms: Number(bathroomsCount),
      description,
      sector,
    };

    onSubmit && onSubmit(formData); 
  };

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<any>>,
    field: keyof typeof errors
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
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
    <form>
      <FormControl fullWidth margin="normal" required error={!!errors.name}>
        <FormLabelComponent htmlFor="nombre">Nombre</FormLabelComponent>
        <TextField
          id="nombre"
          fullWidth
          value={name}
          onChange={handleChange(setName, "name")}
        />
        {renderHelperText("name")}
      </FormControl>

      <Box sx={{ display: 'flex', gap: '16px' }}>
        <FormControl sx={{ flex: 1 }} margin="normal" required error={!!errors.square_meters}>
          <FormLabelComponent htmlFor="metros-cuadrados">Metros cuadrados</FormLabelComponent>
          <TextField
            id="metros-cuadrados"
            type="number"
            fullWidth
            value={squareMeters}
            onChange={handleChange(setSquareMeters, "square_meters")}
          />
          {renderHelperText("square_meters")}
        </FormControl>

        <FormControl sx={{ flex: 1 }} margin="normal" required error={!!errors.number_of_bathrooms}>
          <FormLabelComponent htmlFor="cantidad-banos">Cantidad de baños</FormLabelComponent>
          <TextField
            id="cantidad-banos"
            type="number"
            fullWidth
            value={bathroomsCount}
            onChange={handleChange(setBathroomsCount, "number_of_bathrooms")}
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
          value={sector}
          onChange={(e) => setSector(e.target.value as SectorType)}
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
        <FormLabelComponent htmlFor="descripcion">Descripción</FormLabelComponent>
        <TextField
          id="descripcion"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <CustomButton onClick={handleClose} text="Cancelar" sx={{ bgcolor: "#ef5350" }} />
        <CustomButton onClick={handleSubmit} text="Guardar" />
      </Box>
    </form>
  );
};

export default SectorEditForm;
