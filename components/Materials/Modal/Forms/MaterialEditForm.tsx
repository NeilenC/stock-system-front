import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  MenuItem,
  FormHelperText,
  Box,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Category, MaterialProps } from "../../materialsProps";
import CustomButton from "../../../../commons/buttons-commons/CustomButton";
import { useMaterialStore } from "../../../../zustand/materialStore";

const MaterialEditForm = ({
    onSubmit,
    materialId,
    onCancel,
  }: {
    onSubmit?: (formData: any) => void;
    materialId: number | null;
    onCancel?: () => void;
  }) => {
    const { material, categories, setMaterial, fetchMaterialData, fetchCategories } = useMaterialStore();
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      
      const numericFields = ['width', 'depth', 'weight', 'height', 'actual_stock', 'price'];
      const processedValue = numericFields.includes(name) ? (value === '' ? 0 : parseFloat(value)) : value;
    
      setMaterial({ ...material, [name]: processedValue });
    };
  
    const handleCategoryChange = (e: SelectChangeEvent<number>) => {
      const selectedCategoryId = Number(e.target.value);
      setMaterial({
        ...material,
        category: { id: selectedCategoryId, category_name: "" },
      });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (material.category) {
        const finalFormData = {
          ...material,
          category: material.category.id, // Envía solo el ID de la categoría
        };
        onSubmit && onSubmit(finalFormData);
      } else {
        console.error("La categoría no está definida.");
      }
    };
  
    useEffect(() => {
      if (materialId) fetchMaterialData(materialId);
      fetchCategories();
    }, [materialId]);
  

    const handleCancel = () => {
        if (onCancel) {
          onCancel();
        }
      };
      
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
        }}
      >
        <FormControl fullWidth margin="normal" >
          <TextField
            name="name"
            label="Nombre"
            value={material.name}
            onChange={handleInputChange}
          />
          {/* {errors.name && <FormHelperText error>{errors.name}</FormHelperText>} */}
        </FormControl>

        <FormControl fullWidth margin="normal" >
          <TextField
            name="code"
            label="Código"
            value={material.code}
            onChange={handleInputChange}
          />
          {/* {errors.code && <FormHelperText error>{errors.code}</FormHelperText>} */}
        </FormControl>

        <FormControl fullWidth margin="normal" >
          <TextField
            name="color"
            label="Color"
            value={material.color}
            onChange={handleInputChange}
          />
          {/* {errors.color && (
            <FormHelperText error>{errors.color}</FormHelperText>
          )} */}
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            name="width"
            label="Ancho"
            type="number"
            value={material.width}
            onChange={handleInputChange}
          />
          {/* {errors.width && (
            <FormHelperText error>{errors.width}</FormHelperText>
          )} */}
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            name="depth"
            label="Profundidad"
            type="number"
            value={material.depth}
            onChange={handleInputChange}
          />
          {/* {errors.depth && (
            <FormHelperText error>{errors.depth}</FormHelperText>
          )} */}
        </FormControl>

        <FormControl fullWidth margin="normal" >
          <TextField
            name="weight"
            label="Peso"
            type="number"
            value={material.weight}
            onChange={handleInputChange}
          />
          {/* {errors.weight && (
            <FormHelperText error>{errors.weight}</FormHelperText>
          )} */}
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            name="height"
            label="Altura"
            type="number"
            value={material.height}
            onChange={handleInputChange}
          />
          {/* {errors.height && (
            <FormHelperText error>{errors.height}</FormHelperText>
          )} */}
        </FormControl>

        <FormControl fullWidth margin="normal" >
          <TextField
            name="actual_stock"
            label="Stock Actual"
            type="number"
            value={material.actual_stock}
            onChange={handleInputChange}
          />
          {/* {errors.actual_stock && (
            <FormHelperText error>{errors.actual_stock}</FormHelperText>
          )} */}
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            name="price"
            label="Precio"
            type="number"
            value={material.price}
            onChange={handleInputChange}
          />
          {/* {errors.price && (
            <FormHelperText error>{errors.price}</FormHelperText>
          )} */}
        </FormControl>

        <FormControl fullWidth margin="normal" >
          <TextField
            name="description"
            label="Descripción"
            value={material.description}
            onChange={handleInputChange}
          />
          {/* {errors.description && (
            <FormHelperText error>{errors.description}</FormHelperText>
          )} */}
        </FormControl>

        <FormControl fullWidth margin="normal" >
          <TextField
            name="observations"
            label="Observaciones"
            value={material.observations}
            onChange={handleInputChange}
          />
          {/* {errors.observations && (
            <FormHelperText error>{errors.observations}</FormHelperText>
          )} */}
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Categoría</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={material.category?.id} 
            onChange={handleCategoryChange} // Asegúrate de que sea handleCategoryChange
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.category_name}
              </MenuItem>
            ))}
          </Select>
          {/* {errors.category && (
            <FormHelperText error>{errors.category}</FormHelperText>
          )} */}
        </FormControl>
      </Box>

      {/* Botones de Guardar y Cancelar */}
 {/* Botones de Guardar y Cancelar */}
 <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <CustomButton text="Cancelar" onClick={handleCancel} 
        sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.01)', // Fondo muy claro y semitransparente
            border: '1px solid rgba(0, 0, 0, 0.1)', // Borde gris claro
            color: '#6e6e6e', // Color de texto gris
            padding: '8px 16px', // Espaciado interno
            fontSize: '16px', // Tamaño de texto
            fontWeight: '500', // Peso del texto para que se vea similar
            cursor: 'pointer', // Cambiar el cursor al pasar por encima
        }}/>
        <CustomButton text="Guardar" onClick={handleSubmit} />
      </Box>
    </form>
  );
};

export default MaterialEditForm;
