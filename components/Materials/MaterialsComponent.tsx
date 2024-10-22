import { Box, Grid, Typography, Paper, MenuItem, Menu } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Category } from "./materialsProps";
import { useState } from "react";
import { IconButton } from "rsuite";
import theme from "../../themes/theme";

const MaterialOptions = ({ categories, onEdit }: { categories: Category[]; onEdit: (id: number) => void }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>, materialId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedMaterialId(materialId); // Guardamos el ID del material seleccionado
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedMaterialId(null); // Limpiamos el ID cuando cerramos el menú
  };

  const handleEdit = () => {
    if (selectedMaterialId !== null) {
      onEdit(selectedMaterialId);
    }
    handleClose(); // Cerrar el menú después de hacer clic en Editar
  };

  return (
<Box sx={{ padding: 2 }}>
  {categories.length > 0 ? (
    categories.map((category: Category) => (
      <Box key={category.id} sx={{ marginBottom: 4 }}>
        {/* Nombre de la categoría */}
        <Typography
          variant="h5"
          sx={{
            marginBottom: 2,
            backgroundColor: "#3f51b5", // Fondo azul oscuro
            color: "white",
            padding: "8px",
            textAlign: "center",
          }}
        >
          {category.category_name}
        </Typography>

        <Grid container spacing={2}>
          {/* Encabezados de la tabla */}
          <Grid item xs={12}>
            <Paper
              elevation={2}
              sx={{
                display: "flex",
                padding: 2,
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ flex: 1, fontWeight: "bold" }}>Código</Typography>
              <Typography sx={{ flex: 1, fontWeight: "bold" }}>Nombre</Typography>
              <Typography sx={{ flex: 1, fontWeight: "bold" }}>Color</Typography>
              <Typography sx={{ flex: 1, fontWeight: "bold" }}>Dimensiones (m)</Typography>
              <Typography sx={{ flex: 1, fontWeight: "bold" }}>Stock</Typography>
              <Typography sx={{ flex: 1, fontWeight: "bold" }}>Precio ($)</Typography>
              <Typography sx={{ flex: 1, fontWeight: "bold" }}>Última Actualización</Typography>
              <Typography sx={{ flex: 2, fontWeight: "bold" }}>Observaciones</Typography>
              <Typography sx={{ flex: 0.5, fontWeight: "bold" }}>Editar</Typography>
            </Paper>
          </Grid>

          {/* Contenedor para los materiales con overflow */}
          <Grid item xs={12} sx={{ maxHeight: '300px', overflowY: 'auto' }}>
            {category.materials.length > 0 ? (
              category.materials.map((material) => (
                <Paper key={material.id} elevation={1} sx={{ display: "flex", padding: 2, alignItems: "center" }}>
                  <Typography sx={{ flex: 1 }}>{material.code}</Typography>
                  <Typography sx={{ flex: 1 }}>{material.name}</Typography>
                  <Typography sx={{ flex: 1 }}>{material.color}</Typography>
                  <Typography sx={{ flex: 1 }}>
                    {material.width}m x {material.depth}m
                  </Typography>
                  <Typography sx={{ flex: 1 }}>{material.actual_stock}</Typography>
                  <Typography sx={{ flex: 1 }}>${material.price}</Typography>
                  <Typography sx={{ flex: 1 }}>
                    {new Date(material.last_stock_update).toLocaleDateString()}
                  </Typography>
                  <Typography sx={{ flex: 2 }}>{material.observations || "N/A"}</Typography>

                  {/* Icono de edición */}
                  <Box>
                    <IconButton onClick={(event: any) => handleClick(event, material.id)}>
                      <MoreVertIcon />
                    </IconButton>

                    {/* Menú desplegable */}
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl && selectedMaterialId === material.id)}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      {/* Opción de editar */}
                      <MenuItem onClick={handleEdit}>Editar</MenuItem>
                    </Menu>
                  </Box>
                </Paper>
              ))
            ) : (
              <Typography variant="body2" sx={{ padding: 2 }}>
                No hay materiales disponibles en esta categoría.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    ))
  ) : (
    <Typography>Cargando categorías...</Typography>
  )}
</Box>

  );
};

export default MaterialOptions;
