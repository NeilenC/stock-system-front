// CreateCategoryModal.tsx
import React, { useState, useEffect } from "react";
import { Typography, Snackbar, Modal, Box, Divider, FormHelperText } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import CustomButton from "../../../commons/buttons-commons/CustomButton";
import { CustomTextField, FormLabelComponent } from "../../../commons/styled-components/CustomTextFields";
import { useMaterialStore } from "../../../zustand/materialStore";
import theme from "../../../themes/theme";
import Toast from "../../../commons/Toast";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Estilos para el contenedor del modal
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300, 
  height: "auto", 
  bgcolor: "background.paper",
  border: "1px solid #0000001A",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "0", 
};

const ModalCategory = ({
  isOpen,
  onClose,
  onCreateSuccess,
  categoryToEdit, 
  isEditSucces
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreateSuccess?: () => void;
  categoryToEdit?: any;  
  isEditSucces?: any
}) => {
  const [categoryName, setCategoryName] = useState("");
  const { fetchCategories } = useMaterialStore();
  const [categories, setCategories] = useState<string[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [error, setError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastProps, setToastProps] = useState({
    messageLeft: "",
    messageRight: "",
    bgcolor: theme.palette.success.light,
    color: "",
  });

  const showToastMessage = (
    messageLeft: string,
    messageRight: string,
    bgcolor: string,
    color: string
  ) => {
    setToastProps({ messageLeft, messageRight, bgcolor, color });
    setShowToast(true);
  };


  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      if (categoryToEdit) {
        setCategoryName(categoryToEdit.category_name); 
      }
    }
  }, [isOpen, categoryToEdit]);


  const handleChange = (event: any) => {
    const { value } = event.target;
    setCategoryName(value);
  
    // Resetear el error si el usuario escribe algo nuevo
    if (error) {
      setError(false);
    }
  
    // Mantener la verificación de si la categoría ya existe
    if (categories.includes(value)) {
      setError(true);
    }
  };

  const handleCreateCategory = async () => {
    // Verificar si la categoría ya existe antes de proceder
    if (categories.includes(categoryName)) {
      setError(true);
      return;
    }
  
    const body = JSON.stringify({ category_name: categoryName });
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );
  
      if (response.ok) {
        showToastMessage(
          "Categoría creada exitosamente.",
          "",
          theme.palette.success.light,
          "white"
        );
        if (onCreateSuccess) onCreateSuccess();
      } else {
        // Manejo del caso donde la categoría ya existe
        showToastMessage(
          "Categoría existente",
          "",
          theme.palette.error.light,
          "white"
        );
      }
  
      await fetchCategories();
      onClose();
    } catch (error) {
      setSnackbarMessage("Error de red. Por favor, intenta de nuevo.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  
    setCategoryName("");
  };
  
  const handleUpdateCategory = async () => {

    if (categories.includes(categoryName)) {
      setError(true);
      return;
    }

    
    if (!categoryToEdit) return;
    const body = JSON.stringify({ category_name: categoryName });
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials-category/${categoryToEdit.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );
  
      if (response.ok) {
        showToastMessage(
          "Categoría actualizada exitosamente.",
          "",
          theme.palette.success.light,
          "white"
        );
        if (isEditSucces) isEditSucces(true);
      } else {
        const errorData = await response.json();
        const backendMessage = "Ya existe una categoría con ese nombre";
        setSnackbarMessage(backendMessage);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        
      }
  
      await fetchCategories();
      onClose();
    } catch (error) {
      setSnackbarMessage("Ya existe una categoría con ese nombre.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  
    setCategoryName("");
  };
  
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (categoryToEdit) {
      await handleUpdateCategory();
    } else {
      await handleCreateCategory();
    }
  };
  

  const handleSnackbarClose = () => {
    setOpenSnackbar(false); 
  };

  return (
    <div>
      <Modal
        open={isOpen || false}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',  p:1, pt:2}}>

            <Typography
              gutterBottom
              align="center"
              sx={{ width: "100%" }}
            >
              {categoryToEdit ? "Editar Categoría" : "Crear Nueva Categoría"}
            </Typography>

          </Box>
          <Divider />
          
          <form style={{ display: "flex", flexDirection: "column", paddingInline: "25px" }}>
            <Box sx={{ height: "200px", alignContent: "center" }}>
              <FormLabelComponent>
                Nombre
                <CustomTextField
                  variant="outlined"
                  fullWidth
                  required
                  value={categoryName}
                  onChange={handleChange}
                  margin="dense"
                  error={error} // Activa el estado de error si la categoría existe
                />
              </FormLabelComponent>
              <FormHelperText error={error} sx={{ height: "5px" }}>
                {error ? "La categoría ya existe. Por favor, utiliza otra." : ""}
              </FormHelperText>
            </Box>
          </form>

          <Divider />
          <Box sx={{ p: 2, display:'flex', gap: 2 }}>
            <CustomButton
              text="Cancelar"
              onClick={onClose}
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.01)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                color: "#6e6e6e",
                padding: "8px 8px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            />
            <CustomButton
              text={categoryToEdit ? "Actualizar" : "Crear"}
              onClick={handleSubmit}
            />
          </Box>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
              {snackbarMessage}
            </Alert>
          </Snackbar>

        </Box>
      </Modal>
      {showToast && (
        <Toast
          messageLeft={toastProps.messageLeft}
          messageRight={toastProps.messageRight}
          bgcolor={toastProps.bgcolor}
          color={toastProps.color}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default ModalCategory;
