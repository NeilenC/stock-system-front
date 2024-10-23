import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { Category } from "../materialsProps";
import {  FormLabelComponent } from "../../../commons/styled-components/CustomTextFields";
import { CustomSelectComponent, CustomTextFieldMaterial } from "../StyledMaterial";
import theme from "../../../themes/theme";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700, // Aumentar el ancho para acomodar los dos inputs
  bgcolor: "background.paper",
  borderRadius:'8px',
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh", // Limitar la altura del modal
  overflowY: "auto", // Habilitar scroll si el contenido excede la altura
};

const CreateMaterialModal = ({ open, onClose }: any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code: "",
    color: "",
    image: null,
    weight: 0,
    width: 0,
    depth: 0,
    actual_stock: 0,
    observations: "",
    price: 0,
    is_active: true,
    category: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials-category`
      );
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value === null ? "" : String(value));
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        toast.success("Material creado exitosamente");
        onClose(); // Cierra el modal
      } else {
        throw new Error("Error al crear el material");
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
    }
  };

  return (
<Modal open={open} onClose={onClose}>
  <Box sx={style}>
    <Typography variant="h4" sx={{textAlign:'center', pb:2}}>Crear Material</Typography>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Nombre</FormLabelComponent>
          <CustomTextFieldMaterial
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Descripción</FormLabelComponent>
          <CustomTextFieldMaterial
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Código</FormLabelComponent>
          <CustomTextFieldMaterial
            name="code"
            value={formData.code}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Color</FormLabelComponent>
          <CustomTextFieldMaterial
            name="color"
            value={formData.color}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormLabelComponent>Imagen</FormLabelComponent>
          <CustomTextFieldMaterial
            type="file"
            name="image"
            onChange={handleFileChange}
            fullWidth
            required
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Peso</FormLabelComponent>
          <CustomTextFieldMaterial
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Ancho</FormLabelComponent>
          <CustomTextFieldMaterial
            type="number"
            name="width"
            value={formData.width}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Profundidad</FormLabelComponent>
          <CustomTextFieldMaterial
            type="number"
            name="depth"
            value={formData.depth}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabelComponent>Stock Actual</FormLabelComponent>
          <CustomTextFieldMaterial
            type="number"
            name="actual_stock"
            value={formData.actual_stock}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
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
    margin="normal"
  />
</Grid>
<Grid item xs={12} sm={6}>
  <FormLabelComponent>Categoría</FormLabelComponent>
  <CustomTextFieldMaterial 
    name="category"
    value={formData.category}
    onChange={handleChange}
    fullWidth
    margin="normal"
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
          <FormLabelComponent>Observaciones</FormLabelComponent>
          <TextField
            name="observations"
            value={formData.observations}
            rows={5} // Adjust rows as needed

            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                border: `1px solid ${theme.palette.info.light}`,
              },
            }}
          />
        </Grid>

      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 4, width: '100%' }}
      >
        Crear Material
      </Button>
    </form>
  </Box>
</Modal>

  );
};

export default CreateMaterialModal;
