import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { toast } from 'react-toastify';
import { Category } from '../materialsProps';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600, // Aumentar el ancho para acomodar los dos inputs
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh', // Limitar la altura del modal
  overflowY: 'auto', // Habilitar scroll si el contenido excede la altura
};

const CreateMaterialModal = ({ open, onClose }: any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    code: '',
    color: '',
    image: null,
    weight: 0,
    width: 0,
    depth: 0,
    actual_stock: 0,
    observations: '',
    price: 0,
    is_active: true,
    category: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/materials-category`);
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
      formDataToSend.append(key, value === null ? '' : String(value));
    });
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/materials`, {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (response.ok) {
        toast.success('Material creado exitosamente');
        onClose(); // Cierra el modal
      } else {
        throw new Error('Error al crear el material');
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <h2>Crear Material</h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Código"
                name="code"
                value={formData.code}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="file"
                name="image"
                onChange={handleFileChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Peso"
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ancho"
                type="number"
                name="width"
                value={formData.width}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Profundidad"
                type="number"
                name="depth"
                value={formData.depth}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Stock Actual"
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
              <TextField
                label="Observaciones"
                name="observations"
                value={formData.observations}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Precio"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required margin="normal">
                <InputLabel id="category-label">Categoría</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Crear Material
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateMaterialModal;
