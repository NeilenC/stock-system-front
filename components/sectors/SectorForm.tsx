import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button, FormHelperText } from "@mui/material";
import { SectorType } from "./enum";

const SectorForm = ({
  onSubmit,
  error,
  initialData,
}: {
  onSubmit: (formData: any) => void;
  error: string;
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
  const [sector, setSector] = useState<SectorType>(
    initialData?.sector || SectorType.PABELLONES
  );
  const [descripcion, setDescripcion] = useState(
    initialData?.description || ""
  );
  const [errors, setErrors] = useState({
    name: "",
    square_meters: "",
    number_of_bathrooms: "",
    sector: ""
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
    let newErrors = { name: "", square_meters: "", number_of_bathrooms: "", sector: "" };

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
      newErrors.sector = 'El sector es requerido';
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
      <TextField
        placeholder="Nombre"
        fullWidth
        margin="normal"
        value={nombre}
        onChange={handleChange(setNombre, "name")}
        required
        error={!!errors.name}
      />
      {errors.name && renderHelperText("name")}
      <TextField
        placeholder="Metros cuadrados"
        type="number"
        fullWidth
        margin="normal"
        value={metrosCuadrados}
        onChange={handleChange(setMetrosCuadrados, "square_meters")}
        required
        error={!!errors.square_meters}
      />
      {errors.square_meters && renderHelperText("square_meters")}

      <TextField
        placeholder="Cantidad de baños"
        type="number"
        fullWidth
        margin="normal"
        value={cantidadBanos}
        onChange={handleChange(setCantidadBanos, "number_of_bathrooms")}
        required
        error={!!errors.number_of_bathrooms}
      />
      {errors.number_of_bathrooms && renderHelperText("number_of_bathrooms")}

      <TextField
        placeholder="Sector"
        select
        fullWidth
        margin="normal"
        value={sector}
        onChange={(e) => setSector(e.target.value as SectorType)}
      >
        {Object.values(SectorType).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      {errors.sector && renderHelperText('sector')}

      <TextField
        placeholder="Descripción"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        style={{ marginTop: "20px" }}
      >
        Guardar
      </Button>
    </form>
  );
};

export default SectorForm;
