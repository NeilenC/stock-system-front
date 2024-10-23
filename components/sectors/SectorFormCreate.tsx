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

const SectorFormCreate = ({
  onSubmit,
  error,
  initialData,
  handleClose,
}: {
  onSubmit: (formData: any) => void;
  error: string;
  handleClose: () => void;
  initialData?: {
    name: string;
    square_meters: number;
    number_of_bathrooms: number;
    description: string;
    sector: SectorType;
  };
}) => {
  const [nombre, setNombre] = useState(initialData?.name || "");
  const [metrosCuadrados, setMetrosCuadrados] = useState(
    initialData?.square_meters || ""
  );
  const [cantidadBanos, setCantidadBanos] = useState(
    initialData?.number_of_bathrooms || ""
  );
  const [sector, setSector] = useState<SectorType | "">(
    initialData?.sector || ""
  );
  console.log("SECTOR ACA EN FORMIULARIO", sector)
  const [descripcion, setDescripcion] = useState(
    initialData?.description || ""
  );
  const [errors, setErrors] = useState({
    name: "",
    square_meters: "",
    number_of_bathrooms: "",
    sector: "",
  });

  useEffect(() => {
    // When initialData changes, update the states
    if (initialData) {
      setNombre(initialData.name);
      setMetrosCuadrados(initialData.square_meters.toString());
      setCantidadBanos(initialData.number_of_bathrooms.toString());
      setSector(initialData.sector);
      setDescripcion(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = () => {
    let isValid = true;
    let newErrors = {
      name: "",
      square_meters: "",
      number_of_bathrooms: "",
      sector: "",
    };

    if (!nombre) {
      newErrors.name = "El nombre es requerido";
      isValid = false;
    }

    if (!metrosCuadrados) {
      newErrors.square_meters = "Los metros cuadrados son requeridos";
      isValid = false;
    }

    if (!cantidadBanos) {
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
      name: nombre,
      square_meters: Number(metrosCuadrados),
      number_of_bathrooms: Number(cantidadBanos),
      description: descripcion,
      sector: sector,
    };

    onSubmit(formData);
  };

  const handleChange =
    (
      setter: React.Dispatch<React.SetStateAction<any>>,
      field: keyof typeof errors
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <FormLabelComponent htmlFor="nombre" >
      Nombre
    </FormLabelComponent>
    <TextField
      id="nombre"
      placeholder="Nombre"
      fullWidth
      value={nombre}
      onChange={handleChange(setNombre, "name")}
    />
    {errors.name && renderHelperText("name")}
  </FormControl>

  <Box sx={{ display: 'flex', gap: '16px' }}> {/* Contenedor con display flex y un espacio entre los campos */}
  <FormControl sx={{ flex: 1 }} margin="normal" required error={!!errors.square_meters}>
    <FormLabelComponent htmlFor="metros-cuadrados">
      Metros cuadrados
    </FormLabelComponent>
    <TextField
      id="metros-cuadrados"
      placeholder="Metros cuadrados"
      type="number"
      fullWidth
      value={metrosCuadrados}
      onChange={handleChange(setMetrosCuadrados, "square_meters")}
    />
    {errors.square_meters && renderHelperText("square_meters")}
  </FormControl>

  <FormControl sx={{ flex: 1 }} margin="normal" required error={!!errors.number_of_bathrooms}>
    <FormLabelComponent htmlFor="cantidad-banos">
      Cantidad de baños
    </FormLabelComponent>
    <TextField
      id="cantidad-banos"
      placeholder="Cantidad de baños"
      type="number"
      fullWidth
      value={cantidadBanos}
      onChange={handleChange(setCantidadBanos, "number_of_bathrooms")}
    />
    {errors.number_of_bathrooms && renderHelperText("number_of_bathrooms")}
  </FormControl>
</Box>


  <FormControl fullWidth margin="normal">
    <FormLabelComponent htmlFor="sector" >
      Categoría
    </FormLabelComponent>
    <TextField
      id="sector"
      placeholder="Sector"
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
    {errors.sector && renderHelperText("sector")}
  </FormControl>

  <FormControl fullWidth margin="normal">
    <FormLabelComponent htmlFor="descripcion" >
      Descripción
    </FormLabelComponent>
    <TextField
      id="descripcion"
      placeholder="Descripción"
      fullWidth
      multiline
      rows={3}
      value={descripcion}
      onChange={(e) => setDescripcion(e.target.value)}
    />
  </FormControl>

  {/* Contenedor para los botones */}
  <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
    {/* Botón Cancelar */}
    <CustomButton onClick={handleClose} text="Cancelar" sx={{ bgcolor: "#ef5350" }} />
    
    {/* Botón Guardar */}
    <CustomButton onClick={handleSubmit} text="Guardar"  />
  </Box>
</form>

  );
};

export default SectorFormCreate;
