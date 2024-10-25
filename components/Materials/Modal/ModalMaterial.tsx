// import React, { useState, useEffect } from "react";
// import { Box, Modal, TextField, Typography, Button } from "@mui/material";

// const ModalMaterial = ({ open, handleClose, material, onSave }: any) => {
//   // Estados locales para los campos de edición
//   const [name, setName] = useState("");
//   const [code, setCode] = useState("");
//   const [color, setColor] = useState("");
//   const [dimensions, setDimensions] = useState("");
//   const [actualStock, setActualStock] = useState("");
//   const [price, setPrice] = useState("");
//   const [observations, setObservations] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [materialId, setMaterialId] = useState(null)
//   console.log("SILE ---", file)
//   // Efecto para actualizar los campos cuando se abre el modal
//   useEffect(() => {
//     if (material) {
//       setName(material.name);
//       setCode(material.code);
//       setColor(material.color);
//       setDimensions(`${material.width}m x ${material.depth}m`);
//       setActualStock(material.actual_stock);
//       setPrice(material.price);
//       setObservations(material.observations);
//     }
//   }, [material]);

//   // Función para manejar el guardado (sin PATCH)
// const handleSave = () => {
//   const { id, ...rest } = material; // Desestructura para excluir el id
//   const updatedMaterial = {
//     ...rest, // Incluye solo las propiedades restantes
//     name,
//     code,
//     color,
//     width: dimensions.split("x")[0].trim().replace("m", ""),
//     depth: dimensions.split("x")[1].trim().replace("m", ""),
//     actual_stock: actualStock,
//     price,
//     observations,
//   };

//   // Enviamos el archivo solo si existe
//   onSave(updatedMaterial, file, id); // Envía el id como tercer argumento
//   handleClose(); // Cierra el modal
// };

  
  
//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="edit-material-modal"
//     >
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 400,
//           bgcolor: "background.paper",
//           borderRadius: 2,
//           boxShadow: 24,
//           p: 4,
//         }}
//       >
//         <Typography
//           id="edit-material-modal"
//           variant="h6"
//           component="h2"
//           gutterBottom
//         >
//           Editar Material
//         </Typography>

//         {/* Campos de texto */}
//         <TextField
//           fullWidth
//           label="Nombre"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           sx={{ marginBottom: 2 }}
//         />
//         <TextField
//           fullWidth
//           label="Código"
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           sx={{ marginBottom: 2 }}
//         />
//         <TextField
//           fullWidth
//           label="Color"
//           value={color}
//           onChange={(e) => setColor(e.target.value)}
//           sx={{ marginBottom: 2 }}
//         />
//         <TextField
//           fullWidth
//           label="Dimensiones"
//           value={dimensions}
//           onChange={(e) => setDimensions(e.target.value)}
//           sx={{ marginBottom: 2 }}
//         />
//         <TextField
//           fullWidth
//           label="Stock actual"
//           value={actualStock}
//           onChange={(e) => setActualStock(e.target.value)}
//           sx={{ marginBottom: 2 }}
//         />
//         <TextField
//           fullWidth
//           label="Precio"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           sx={{ marginBottom: 2 }}
//         />
//         <TextField
//           fullWidth
//           label="Observaciones"
//           value={observations}
//           onChange={(e) => setObservations(e.target.value)}
//           sx={{ marginBottom: 2 }}
//         />

//         {/* Campo de archivo */}
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
//           accept="image/*"
//           style={{ marginBottom: "16px" }}
//         />

//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={handleSave}
//         >
//           Guardar Cambios
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default ModalMaterial;
