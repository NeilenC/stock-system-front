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
import CreateMaterialModal from "./Modal/CreateMaterialForm";
import SectionComponent from "../From-Nabvar/Navbar/Section-page/SectionComponent";
import CustomButton from "../../commons/buttons-commons/CustomButton";
import materials from "../../public/materials.png";
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

  return ( <>hola</>

  );
};

export default MaterialOptions;
