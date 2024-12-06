import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Grid,
  Tooltip,
  Typography,
  FormLabel,
  Autocomplete,
} from "@mui/material";
// import { FormLabelComponent } from "../../../commons/styled-components/CustomTextFields";
import { CustomTextFieldMaterial } from "../StyledMaterial";
import theme from "../../../themes/theme";
import { useMaterialStore } from "../../../zustand/materialStore";
import ImageToIcon from "../../../commons/styled-components/IconImages";
import add from "../../../public/add.png";
import CreateCategoryForm from "./ModalCategoryCreate";
import CustomNumberInput from "../../../commons/styled-components/CustomNumberInput";
import useSectors from "../../../hooks/useSectors";

interface FormLabelComponentProps {
  children: React.ReactNode;
  error?: string; // Recibimos el mensaje de error
}

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
}: any) => {
  const { fetchCategories, categories } = useMaterialStore();
  const [openModal, setOpenModal] = useState(false);
  const { storageSectors } = useSectors();

  console.log("FORMDATA", formData);
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

  return (
    <form>
      <Grid container spacing={1} alignItems="stretch">
        <Grid item xs={6} sm={6}>
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
          />
        </Grid>
        <Grid
          item
          sm={6}
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

        <Grid item xs={12} sm={12}>
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
          />
        </Grid>
        <Grid item xs={3} sm={3}>
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
          />
        </Grid>
        <Grid item xs={3} sm={3}>
          <FormLabelComponent>Color</FormLabelComponent>
          <CustomTextFieldMaterial
            name="color"
            value={formData.color}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </Grid>

        <Grid item xs={3} sm={3}>
          <FormLabelComponent error={formErrors.storaged_stock}>
            Stock Inicial
          </FormLabelComponent>
          <CustomNumberInput
            name="distribution_stock.storaged_stock"
            value={formData.distribution_stock[0].storaged_stock}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
          />
        </Grid>

        {/* Selección de Depósito */}
        <Grid item xs={4} sm={3}>
          <FormLabelComponent error={formErrors.sector_id}>
            Ubicación Stock
          </FormLabelComponent>
          <CustomTextFieldMaterial
            name="distribution_stock.sector_id"
            value={Number(formData.distribution_stock[0].sector_id) ?? 0}
            onChange={handleChange}
            required
            fullWidth
            margin="dense"
            select
          >
            {storageSectors.map((sector) => (
              <MenuItem key={sector.id} value={sector.id}>
                {sector.name}
              </MenuItem>
            ))}
          </CustomTextFieldMaterial>
        </Grid>

        <Grid item xs={3} sm={3}>
          <FormLabelComponent>Peso</FormLabelComponent>
          <CustomNumberInput
            name="weight"
            value={formData.weight ? formData.weight : 0}
            onChange={handleChange} 
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item xs={3} sm={3}>
          <FormLabelComponent>Ancho</FormLabelComponent>
          <CustomNumberInput
            name="width"
            value={formData.width}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormLabelComponent>Altura</FormLabelComponent>
          <CustomNumberInput
            name="height"
            value={formData.height}
            onChange={handleChange}
            margin="dense"
          />
        </Grid>
        <Grid item xs={3} sm={3}>
          <FormLabelComponent>Profundidad</FormLabelComponent>
          <CustomNumberInput
            name="depth"
            value={formData.depth}
            onChange={handleChange}
            margin="dense"
          />
        </Grid>

        <Grid item xs={3} sm={6}>
          <FormLabelComponent error={formErrors.price}>
            Precio
          </FormLabelComponent>
          <CustomNumberInput
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            margin="dense"
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
    </form>
  );
};

export default CreateMaterialForm;
