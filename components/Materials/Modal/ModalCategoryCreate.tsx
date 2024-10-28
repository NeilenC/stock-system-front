// CreateCategoryModal.tsx
import React, { useState, useEffect } from "react";
import { Typography, Snackbar, Modal, Box, Divider, FormHelperText, IconButton } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import CustomButton from "../../../commons/buttons-commons/CustomButton";
import { CustomTextField, FormLabelComponent } from "../../../commons/styled-components/CustomTextFields";
import { useMaterialStore } from "../../../zustand/materialStore";

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
  width: 300, // Ajusta el ancho según sea necesario
  height: "auto", // Cambia a auto para permitir que el contenido ajuste la altura
  bgcolor: "background.paper",
  border: "1px solid #0000001A",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "0", // Elimina el padding para el contenedor
};

const ModalCategoryCreate = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
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

  useEffect(() => {

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const handleChange = (event:  any) => {
    const { value } = event.target;
    setCategoryName(value);
    setError(categories.includes(value)); // Verifica si la categoría ya existe
  };

  const handleCreateCategory = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

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
        setSnackbarMessage("Categoría creada exitosamente.");
        setSnackbarSeverity("success");
        fetchCategories()
        onClose()
      } else {
        const errorData = await response.json();
        setSnackbarMessage(errorData.message || "Error al crear la categoría.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage("Error de red. Por favor intenta de nuevo.");
      setSnackbarSeverity("error");
    }

    setCategoryName("");
    setOpenSnackbar(true);
    setError(false); // Resetear el error al enviar
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Modal
        open={isOpen}
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
              Crear Nueva Categoría
            </Typography>
          
          </Box>
          <Divider />
          
          <form style={{ display: "flex", flexDirection: "column", paddingInline: '25px' }}>
            <Box sx={{ height: '200px', alignContent: 'center' }}>
              <FormLabelComponent>Nombre
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
              <Box>

              {error ? (
                <FormHelperText error sx={{height: '5px',}}>
                  La categoría ya existe. Por favor, utiliza otra 
                </FormHelperText>
              ): (
                <Box sx={{height: '5px',}}></Box>
              )}
              </Box>
            </Box>
          </form>

          <Divider />
          <Box sx={{ p: 2 }}>
            <CustomButton
              text="Crear"
              onClick={handleCreateCategory}
              sx={{ width: "100%" }} // Asegúrate de que el botón ocupe el ancho completo
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

    </div>
  );
};

export default ModalCategoryCreate;
