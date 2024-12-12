import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Grid,
  Tooltip,
  Typography,
  FormLabel,
  Autocomplete,
  FormControl,
} from "@mui/material";
// import { FormLabelComponent } from "../../../commons/styled-components/CustomTextFields";
import { CustomTextFieldMaterial } from "../StyledMaterial";
import theme from "../../../themes/theme";
import { useMaterialStore } from "../../../zustand/materialStore";
import ImageToIcon from "../../../commons/styled-components/IconImages";
import add from "../../../public/add.png";
import deleteicon from "../../../public/delete.png";
import CreateCategoryForm from "./ModalCategoryCreate";
import CustomNumberInput from "../../../commons/styled-components/CustomNumberInput";
import useSectors from "../../../hooks/useSectors";

interface FormLabelComponentProps {
  children: React.ReactNode;
  error?: string; // Recibimos el mensaje de error
}

type StockInput = {
  material_location_in_sector: number;
  storaged_stock: number;
};

const FormLabelComponent = ({ children, error }: FormLabelComponentProps) => {
  return (
    <FormLabel sx={{ display: "flex", alignItems: "center" }}>
      <Grid
        container
        alignItems="center"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Grid item>{children}</Grid>
        {error && (
          <Grid item>
            <Typography
              variant="body2"
              sx={{ color: "red", fontSize: "20px", marginLeft: "8px" }}
            >
              {error}
            </Typography>
          </Grid>
        )}
      </Grid>
    </FormLabel>
  );
};
const CreateMaterialForm = ({
  formData,
  handleChange,
  handleFileChange,
  formErrors,
  setFormData,
}: any) => {
  const { fetchCategories, categories } = useMaterialStore();
  const [openModal, setOpenModal] = useState(false);
  const { storageSectors } = useSectors();
  const [addMoreStock, setAddMoreStock] = useState(false);
  const [stockInputs, setStockInputs] = useState<StockInput[]>([
    { material_location_in_sector: 0, storaged_stock: 0 },
  ]);
  console.log("ACA",formErrors.distribution_stock);

  useEffect(() => {
    const loadCategories = async () => {
      await fetchCategories();
    };

    loadCategories();
  }, [fetchCategories]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleAddMoreStock = () => {
    // Solo agregar más inputs si no se excede la cantidad de `storageSectors`
    if (stockInputs.length < storageSectors.length) {
      setStockInputs([...stockInputs, { material_location_in_sector: 0, storaged_stock: 0 }]);
    }
  };

  const handleRemoveStockInput = (index: number) => {
    // No permitir eliminar el primer campo
    if (index !== 0) {
      const updatedInputs = stockInputs.filter((_, i) => i !== index);
      setStockInputs(updatedInputs);
    }
  };

  useEffect(() => {
    // Filtrar los valores con storaged_stock != 0
    const filteredStockInputs = stockInputs.filter(
      (input) => input.storaged_stock !== 0
    );

    setFormData((prev: any) => ({
      ...prev,
      distribution_stock: filteredStockInputs,
    }));
  }, [stockInputs]);

  // useEffect(() => {
  //   // Filtrar los valores con storaged_stock !== 0
  //   const filteredStockInputs = stockInputs.filter(
  //     (input) => input.storaged_stock !== 0
  //   );

  //   // Agrupar los inputs por sector_id y sumar las cantidades
  //   const groupedBySector = filteredStockInputs.reduce((acc: any, input) => {
  //     const existingSector = acc.find((sector: any) => sector.sector_id === input.sector_id);

  //     if (existingSector) {
  //       // Si el sector ya existe en el acumulador, sumamos el storaged_stock
  //       existingSector.storaged_stock += input.storaged_stock;
  //     } else {
  //       // Si el sector no existe, lo agregamos al acumulador
  //       acc.push({ ...input });
  //     }

  //     return acc;
  //   }, []);

  //   // Actualizar el estado con los datos agrupados
  //   setFormData((prev: any) => ({
  //     ...prev,
  //     distribution_stock: groupedBySector,
  //   }));
  // }, [stockInputs]);

  const handleInputChange = (
    index: number,
    field: keyof StockInput,
    value: any
  ) => {
    const updatedInputs = [...stockInputs];
    updatedInputs[index][field] = value;
    setStockInputs(updatedInputs);
  };


  return (
    <FormControl>
      <Grid
        container
        spacing={1}
        alignItems="stretch"
        sx={{ overflowY: "auto", maxHeight: "600px", 
          scrollbarWidth: "thin", // Para navegadores Firefox
          scrollbarColor: "#888 ", // Para navegadores Firefox
          "&::-webkit-scrollbar": {
            width: "8px", // Ancho del scrollbar
          },
    
          "&::-webkit-scrollbar-track": {
            background: "#f0f0f0", // Fondo del track del scrollbar
            borderRadius: "8px", // Bordes redondeados
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888", // Color del thumb (parte móvil del scrollbar)
            borderRadius: "8px", // Bordes redondeados
            border: "2px solid #f0f0f0", // Bordes del thumb
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555", // Cambio de color cuando el cursor pasa sobre el thumb
          },
          transition: "all 0.3s ease",
         }}
      >
        <Grid item xs={6} sm={4}>
          <FormLabelComponent error={formErrors.name}>
            Nombre
          </FormLabelComponent>
          <CustomTextFieldMaterial
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
            error={!!formErrors.name}
          />
        </Grid>

        <Grid item xs={3} sm={4}>
          <FormLabelComponent error={formErrors.code}>
            Código
          </FormLabelComponent>

          <CustomTextFieldMaterial
            name="code"
            value={formData.code}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
            error={!!formErrors.code}
          />
        </Grid>

        <Grid
          item
          sm={4}
          container
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid item xs={12}>
            <FormLabelComponent error={formErrors.category}>
              Categoría
            </FormLabelComponent>
          </Grid>
          <Grid item xs={10}>
            <Autocomplete
              id="category-select"
              options={categories}
              getOptionLabel={(option) => option.category_name || ""}
              value={
                categories.find(
                  (category) => category.id === formData.category
                ) || null
              }
              onChange={(event, newValue) => {
                handleChange({
                  target: {
                    name: "category",
                    value: newValue ? newValue.id : "",
                  },
                });
              }}
              renderInput={(params) => (
                <CustomTextFieldMaterial
                  {...params}
                  fullWidth
                  margin="dense"
                  error={!!formErrors.category}
                />
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              noOptionsText="No se encontraron categorías"
            />
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              p: "3px",
              display: "flex",
              cursor: "pointer",
              alignItems: "center",
              height: "40px",
              pl: 1,
              pt: 1,
            }}
          >
            <Tooltip title="Agregar categoría" arrow>
              <span>
                <ImageToIcon
                  icon={add}
                  w={24}
                  h={24}
                  onClick={handleOpenModal}
                  sx={{ alignItems: "center" }}
                />
              </span>
            </Tooltip>
          </Grid>
        </Grid>

        {openModal && (
          <CreateCategoryForm isOpen={openModal} onClose={handleCloseModal} />
        )}

        {stockInputs.map((input, index) => (
          <React.Fragment key={index}>
            {/* Campo para Stock Inicial */}
            <Grid item xs={5.5} sm={5.5}>
              <FormLabelComponent
                error={
                  formErrors.distribution_stock?.[0]?.storaged_stock 
                }
              >
                Stock Inicial
              </FormLabelComponent>
              <CustomNumberInput
                name={`distribution_stock[${index}].storaged_stock`}
                value={input.storaged_stock}
                onChange={(e: any) =>
                  handleInputChange(
                    index,
                    "storaged_stock",
                    Number(e.target.value)
                  )
                }
                fullWidth
                required
                margin="dense"
                error={!!formErrors.distribution_stock?.[0]?.storaged_stock}
                helperText={!!formErrors.distribution_stock?.[0]?.storaged_stock ? 'Este campo es obligatorio' : ''}
              />
            </Grid>

            {/* Campo para Ubicación Stock */}
            <Grid item xs={5.5} sm={index !== 0 ? 5.5 : 5.9}>
              <FormLabelComponent
                error={
                  formErrors.distribution_stock?.[0]?.material_location_in_sector || undefined
                }
              >
                Ubicación Stock
              </FormLabelComponent>
              <CustomTextFieldMaterial
                name={`distribution_stock[${index}].material_location_in_sector`}
                value={input.material_location_in_sector}
                onChange={(e) =>
                  handleInputChange(index, "material_location_in_sector", Number(e.target.value))
                }
                required
                fullWidth
                margin="dense"
                select
                error={!!formErrors.distribution_stock?.[0]?.material_location_in_sector}
                helperText={!!formErrors.distribution_stock?.[0]?.material_location_in_sector ? 'Los campos de stock y depósito son obligatorios' : ''}


              >
                {storageSectors.map((sector) => (
                  <MenuItem key={sector.id} value={sector.id}>
                    {sector.name}
                  </MenuItem>
                ))}
              </CustomTextFieldMaterial>
            </Grid>

            {/* Delete Button (Icon) */}
            {index !== 0 && ( // Prevent deleting the first row
              <Grid
                item
                xs={1}
                sm={0.5}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Tooltip title="Eliminar" arrow>
                  <ImageToIcon
                    icon={deleteicon}
                    w={24}
                    h={24}
                    onClick={() => handleRemoveStockInput(index)}
                    sx={{
                      color: theme.palette.error.main,
                      cursor: "pointer",
                      pt: 4,
                    }}
                  />
                </Tooltip>
              </Grid>
            )}
          </React.Fragment>
        ))}

        {/* Botón para agregar más inputs */}
        <Grid item xs={1} sm={0.5}>
          <Tooltip title="Agregar ubicación de stock" arrow>
            <span>
              <ImageToIcon
                icon={add}
                w={24}
                h={24}
                onClick={handleAddMoreStock}
                sx={{ alignItems: "center", cursor: "pointer", pt: 5 }}
              />
            </span>
          </Tooltip>
        </Grid>

        <Grid item xs={3} sm={4}>
          <FormLabelComponent>Peso</FormLabelComponent>
          <CustomNumberInput
            name="weight"
            value={formData.weight ? formData.weight : 0}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item xs={3} sm={4}>
          <FormLabelComponent>Ancho</FormLabelComponent>
          <CustomNumberInput
            name="width"
            value={formData.width}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormLabelComponent>Altura</FormLabelComponent>
          <CustomNumberInput
            name="height"
            value={formData.height}
            onChange={handleChange}
            margin="dense"
          />
        </Grid>
        <Grid item xs={3} sm={4}>
          <FormLabelComponent>Profundidad</FormLabelComponent>
          <CustomNumberInput
            name="depth"
            value={formData.depth}
            onChange={handleChange}
            margin="dense"
          />
        </Grid>

        <Grid item xs={3} sm={4}>
          <FormLabelComponent error={formErrors.price}>
            Precio
          </FormLabelComponent>
          <CustomTextFieldMaterial
            name="price"
            value={formData.price}
            // onChange={handleChange}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0) {
                handleChange(e);
              }
            }}
            fullWidth
            required
            margin="dense"
            error={!!formErrors.price}
            
          />
        </Grid>

        <Grid item xs={3} sm={4}>
          <FormLabelComponent>Color</FormLabelComponent>
          <CustomTextFieldMaterial
            name="color"
            value={formData.color}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormLabelComponent error={formErrors.description}>
            Descripción
          </FormLabelComponent>
          <CustomTextFieldMaterial
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
            error={!!formErrors.description}
          />
        </Grid>

        <Grid item xs={6}>
          <FormLabelComponent>Imagen</FormLabelComponent>
          <CustomTextFieldMaterial
            type="file"
            name="image"
            onChange={handleFileChange}
            fullWidth
            margin="dense"
          />
        </Grid>

        <Grid item xs={12}>
          <FormLabelComponent>Observaciones</FormLabelComponent>
          <TextField
            margin="dense"
            name="observations"
            value={formData.observations}
            rows={3}
            onChange={handleChange}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "5px",
                border: `1px solid ${theme.palette.info.light}`,
              },
            }}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default CreateMaterialForm;
