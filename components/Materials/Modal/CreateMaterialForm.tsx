import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { Category } from "../materialsProps";
import { FormLabelComponent } from "../../../commons/styled-components/CustomTextFields";
import {
  CustomSelectComponent,
  CustomTextFieldMaterial,
} from "../StyledMaterial";
import theme from "../../../themes/theme";
import { useMaterialStore } from "../../../zustand/materialStore";

const CreateMaterialForm = ({ formData, handleChange, handleFileChange }:any) => {
  const { fetchCategories, categories } = useMaterialStore();
  // const [formData, setFormData] = useState({
  //   name: "",
  //   description: "",
  //   code: "",
  //   color: "",
  //   image_url: null,
  //   weight: 0,
  //   width: 0,
  //   depth: 0,
  //   height: 0,
  //   actual_stock: 0,
  //   observations: "",
  //   price: 0,
  //   is_active: true,
  //   category: 0,
  // });
  // useEffect(() => {
  //   fetchCategories(); // Load categories when the component mounts
  // }, [fetchCategories]);
  console.log("FORMDATA", formData);
  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: name === "category" ? Number(value) : value, // Ensure the ID is a number
  //   });
  // };
  // console.log("CARTEGORAIA", formData.category);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFormData({ ...formData, image_url: e.target.files[0] });
  //   }
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const formDataToSend = { ...formData, description: formData.description || "" };

  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/materials`, {
  //       method: "POST",
  //       headers: { "Accept": "application/json", "Content-Type": "application/json" },
  //       body: JSON.stringify(formDataToSend),
  //     });

  //     if (response.ok) {
  //       toast.success("Material creado exitosamente");
  //       // Resetear el formulario después de crear el material
  //       setFormData({
  //         name: "",
  //         description: "",
  //         code: "",
  //         color: "",
  //         image_url: null,
  //         weight: 0,
  //         width: 0,
  //         depth: 0,
  //         height: 0,
  //         actual_stock: 0,
  //         observations: "",
  //         price: 0,
  //         is_active: true,
  //         category: 0,
  //       });
  //     } else {
  //       const errorResponse = await response.json();
  //       toast.error(`Error al crear el material: ${errorResponse.message}`);
  //     }
  //   } catch (error) {
  //     console.error("Error creando material:", error);
  //     toast.error("Error creando material.");
  //   }
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   onSubmit({ ...formData, description: formData.description || "" });
  // };

  console.log("category", formData);

  return (
    <form >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Nombre</FormLabelComponent>
          <CustomTextFieldMaterial
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Categoría</FormLabelComponent>
          <CustomTextFieldMaterial
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
            margin="dense"
            select
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.category_name}
              </MenuItem>
            ))}
          </CustomTextFieldMaterial>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormLabelComponent>Descripción</FormLabelComponent>
          <CustomTextFieldMaterial
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormLabelComponent>Código</FormLabelComponent>
          <CustomTextFieldMaterial
            name="code"
            value={formData.code}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormLabelComponent>Color</FormLabelComponent>
          <CustomTextFieldMaterial
            name="color"
            value={formData.color}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormLabelComponent>Stock Actual</FormLabelComponent>
          <CustomTextFieldMaterial
            type="number"
            name="actual_stock"
            value={formData.actual_stock}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormLabelComponent>Peso</FormLabelComponent>
          <CustomTextFieldMaterial
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormLabelComponent>Ancho</FormLabelComponent>
          <CustomTextFieldMaterial
            type="number"
            name="width"
            value={formData.width}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormLabelComponent>Altura</FormLabelComponent>
          <CustomTextFieldMaterial
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormLabelComponent>Profundidad</FormLabelComponent>
          <CustomTextFieldMaterial
            type="number"
            name="depth"
            value={formData.depth}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Precio</FormLabelComponent>
          <CustomTextFieldMaterial
            type="number"
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
            name="observations"
            value={formData.observations}
            rows={5}
            onChange={handleChange}
            fullWidth
            margin="dense"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                border: `1px solid ${theme.palette.info.light}`,
              },
            }}
          />
        </Grid>
      </Grid>
      {/* <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 4, width: "100%" }}
      >
        Crear Material
      </Button> */}
    </form>
  );
};

export default CreateMaterialForm;
