import React, { ChangeEvent, useEffect } from "react";
import { MenuItem, SelectChangeEvent, Grid } from "@mui/material";
import { useMaterialStore } from "../../../../zustand/materialStore";
import { FormLabelComponent } from "../../../../commons/styled-components/CustomTextFields";
import { CustomTextFieldMaterial } from "../../StyledMaterial";

const MaterialEditForm = ({
  materialId,
  updatedMaterial,
}: {
  materialId: number | null;
  updatedMaterial?: any;
}) => {
  const {
    material,
    categories,
    setMaterial,
    fetchMaterialData,
    fetchCategories,
  } = useMaterialStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const numericFields = ["width", "depth", "weight", "height", "price"];
    const processedValue = numericFields.includes(name)
      ? value === ""
        ? "" // Allow the field to be empty
        : parseFloat(value)
      : value;

    setMaterial({ ...material, [name]: processedValue });
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedCategoryId = parseInt(e.target.value); // Convierte el valor a número
    setMaterial({
      ...material,
      category: { id: selectedCategoryId, category_name: "" },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      setMaterial({
        ...material,
        image_url: file,
      });
    }
  };

  useEffect(() => {
    if (materialId) {
      fetchMaterialData(materialId);
    } else if (updatedMaterial) {
      setMaterial(updatedMaterial);
    }
    fetchCategories();
  }, [materialId, updatedMaterial]);

  return (
    <form>
      <Grid container spacing={2}>
        {/** Nombre */}
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Nombre</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="name"
            value={material.name}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormLabelComponent id="category-label">Categoría</FormLabelComponent>
          <CustomTextFieldMaterial
            fullWidth
            margin="dense"
            name="category"
            value={material.category?.id}
            onChange={handleCategoryChange}
            select
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.category_name}
              </MenuItem>
            ))}
          </CustomTextFieldMaterial>
        </Grid>

        {/** Descripción */}
        <Grid item xs={12}>
          <FormLabelComponent>Descripción</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="description"
            value={material.description}
            onChange={handleInputChange}
          />
        </Grid>
        {/** Código */}
        <Grid item xs={12} sm={4}>
          <FormLabelComponent>Código</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="code"
            value={material.code}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabelComponent>Stock Actual</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="actual_stock"
            value={material.actual_stock}
            disabled={true}
          />
        </Grid>
        {/** Ancho */}
        <Grid item xs={12} sm={4}>
          <FormLabelComponent>Ancho</FormLabelComponent>
          <CustomTextFieldMaterial
            name="width"
            margin="dense"
            type="number"
            value={material.width}
            onChange={handleInputChange}
          />
        </Grid>

        {/** Altura */}
        <Grid item xs={12} sm={4}>
          <FormLabelComponent>Altura</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="height"
            type="number"
            value={material.height}
            onChange={handleInputChange}
          />
        </Grid>

        {/** Peso */}
        <Grid item xs={12} sm={4}>
          <FormLabelComponent>Peso</FormLabelComponent>
          <CustomTextFieldMaterial
            name="weight"
            margin="dense"
            type="number"
            value={material.weight}
            onChange={handleInputChange}
          />
        </Grid>

        {/** Profundidad */}
        <Grid item xs={12} sm={4}>
          <FormLabelComponent>Profundidad</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="depth"
            type="number"
            value={material.depth}
            onChange={handleInputChange}
          />
        </Grid>

        {/** Color */}
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Color</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="color"
            value={material.color}
            onChange={handleInputChange}
          />
        </Grid>

        {/** Precio */}
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Precio</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="price"
            type="number"
            value={material.price}
            onChange={handleInputChange}
          />
        </Grid>

        {/** Imágen */}
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Imágen</FormLabelComponent>
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </Grid>

        {/** Observaciones */}
        <Grid item xs={12}>
          <FormLabelComponent>Observaciones</FormLabelComponent>
          <CustomTextFieldMaterial
            margin="dense"
            name="observations"
            value={material.observations}
            onChange={handleInputChange}
          />
        </Grid>

        {/** Categoría */}
      </Grid>
    </form>
  );
};

export default MaterialEditForm;
