import {
  Box,
  Grid,
  Typography,
  Paper,
  MenuItem,
  Menu,
  TextField,
  InputAdornment,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Category } from "./materialsProps";
import { useState } from "react";
import { Button, IconButton } from "rsuite";
import IconToImage from "../../commons/styled-components/IconImages";
import search from "../../public/search.png";
import { CustomTextFieldMaterial } from "./StyledMaterial";
import theme from "../../themes/theme";
import CreateMaterialModal from "./Modal/CreateMaterialModal";
import SectionComponent from "../From-Nabvar/Navbar/Section-page/SectionComponent";
import CustomButton from "../../commons/buttons-commons/CustomButton";
import materials from '../../public/materials.png'
const MaterialOptions = ({
  categories,
  onEdit,
}: {
  categories: Category[];
  onEdit: (id: number) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(
    null
  );
  const [searchTerms, setSearchTerms] = useState<Record<number, string>>({});
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [categoriesReload, setCategories] = useState<Category[]>([]);

  // const loadCategories = async () => {
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/materials-category`);
  //   const data = await response.json();
  //   setCategories(data);
  // };
  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const handleCloseModalCreate = async () => {
    setOpenModalCreate(false);
    // await loadCategories(); // Recargar categorías después de crear el material
  };
  

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    materialId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedMaterialId(materialId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedMaterialId(null);
  };

  const handleEdit = () => {
    if (selectedMaterialId !== null) {
      onEdit(selectedMaterialId);
    }
    handleClose();
  };

  const handleSearchChange = (categoryId: number, value: string) => {
    setSearchTerms((prev) => ({ ...prev, [categoryId]: value }));
  };

  const normalizeString = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  return (
    <Box>

      <SectionComponent
        children={
          <CustomButton
          onClick={handleOpenModalCreate}
            text={"Crear Material"}
          ></CustomButton>
        }
        icon={materials}
        text={"Materiales"}
      />
    <Box sx={{ paddingInline: 10, pt:5}}>

      {openModalCreate && <CreateMaterialModal open={openModalCreate} onClose={handleCloseModalCreate}/>}
      <Box sx={{}}>
        {categories.length > 0 ? (
          categories.map((category: Category) => (
            <Box key={category.id} sx={{ marginBottom: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  backgroundColor: theme.palette.primary.dark,
                  color: "white",
                  padding: "8px",
                  borderRadius: "8px 8px 0px 0px",
                  justifyContent: "center",
                }}
              >
                {category.category_name}
              </Typography>

              <Grid container>
                <Grid item xs={12}>
                  {/* Contenedor para los encabezados */}
                  <Paper
                    sx={{
                      display: "flex",
                      paddingBlock: 1,
                      backgroundColor: theme.palette.background.default,
                      borderRadius: "0px",
                      boxShadow: "none",
                      paddingInline:'16px'
                    }}
                  >
                    <Typography sx={{ flex: 1, fontWeight: "bold" }}>
                      Código
                    </Typography>
                    <Typography sx={{ flex: 1, fontWeight: "bold" }}>
                      Nombre
                    </Typography>
                    <Typography sx={{ flex: 1, fontWeight: "bold" }}>
                      Color
                    </Typography>
                    <Typography sx={{ flex: 1, fontWeight: "bold" }}>
                      Dimensiones (m)
                    </Typography>
                    <Typography sx={{ flex: 1, fontWeight: "bold" }}>
                      Stock
                    </Typography>
                    <Typography sx={{ flex: 1, fontWeight: "bold" }}>
                      Precio ($)
                    </Typography>
                    <Typography sx={{ flex: 1, fontWeight: "bold" }}>
                      Última Actualización
                    </Typography>
                    <Typography sx={{ flex: 2, fontWeight: "bold" }}>
                      Observaciones
                    </Typography>
                    <Typography sx={{ flex: 0, fontWeight: "bold" }}>
                      Editar
                    </Typography>
                  </Paper>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    border: `1px solid ${theme.palette.background.default}`,
                  }}
                >
                  {/* Contenedor para el campo de búsqueda */}
                  {category.materials.length > 0 && (
                    <CustomTextFieldMaterial
                      fullWidth
                      variant="outlined"
                      placeholder={`Buscar en ${category.category_name}`}
                      onChange={(e) =>
                        handleSearchChange(category.id, e.target.value)
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconToImage icon={search} w={20} h={20} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  {category.materials.length > 0 ? (
                    category.materials
                      .filter((material) => {
                        const searchTerm = normalizeString(
                          searchTerms[category.id] || ""
                        );
                        return (
                          normalizeString(material.code).includes(searchTerm) ||
                          normalizeString(material.name).includes(searchTerm) ||
                          normalizeString(material.color).includes(searchTerm)
                        );
                      })
                      .map((material) => (
                        <Paper
                          key={material.id}
                          elevation={1}
                          sx={{
                            display: "flex",
                            padding: 2,
                            alignItems: "center",
                            borderRadius: "0px",
                            borderBottom: `1px solid ${theme.palette.background.default}`,
                          }}
                        >
                          <Typography sx={{ flex: 1 }}>
                            {material.code}
                          </Typography>
                          <Typography sx={{ flex: 1 }}>
                            {material.name}
                          </Typography>
                          <Typography sx={{ flex: 1 }}>
                            {material.color}
                          </Typography>
                          <Typography sx={{ flex: 1 }}>
                            {material.width}m x {material.depth}m
                          </Typography>
                          <Typography sx={{ flex: 1 }}>
                            {material.actual_stock}
                          </Typography>
                          <Typography sx={{ flex: 1 }}>
                            ${material.price}
                          </Typography>
                          <Typography sx={{ flex: 1 }}>
                            {new Date(
                              material.last_stock_update
                            ).toLocaleDateString()}
                          </Typography>
                          <Typography sx={{ flex: 2 }}>
                            {material.observations || "N/A"}
                          </Typography>

                          <Box>
                            <IconButton
                              onClick={(event: any) =>
                                handleClick(event, material.id)
                              }
                            >
                              <MoreVertIcon />
                            </IconButton>

                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(
                                anchorEl && selectedMaterialId === material.id
                              )}
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
                              <MenuItem onClick={handleEdit}>Editar</MenuItem>
                            </Menu>
                          </Box>
                        </Paper>
                      ))
                  ) : (
                    <Typography variant="body2" sx={{ padding: 1 }}>
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
    </Box>
    </Box>
  );
};

export default MaterialOptions;
