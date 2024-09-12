// pages/index.tsx

import { useState } from 'react';

export default function ActivityDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    // <Grid container>
    //   {/* Sidebar izquierda */}
    //   <Grid item xs={12} md={8} sx={{ padding: 2 }}>
    //     <Typography variant="h5">Línea de tiempo</Typography>
    //     {/* Aquí puedes integrar tu calendario o timeline */}
    //     <Box
    //       sx={{
    //         height: '500px',
    //         backgroundColor: '#f5f5f5',
    //         borderRadius: '8px',
    //       }}
    //     >
    //       {/* Ejemplo de área de contenido */}
    //       <Typography variant="h6" sx={{ padding: 2 }}>Eventos</Typography>
    //       {/* Simulación de eventos */}
    //     </Box>
    //   </Grid>

    //   {/* Panel lateral derecho */}
    //   <Grid item xs={12} md={4}>
    //     <Button variant="contained" onClick={toggleDrawer(true)}>Crear Reserva</Button>

    //     <Drawer
    //       anchor="right"
    //       open={drawerOpen}
    //       onClose={toggleDrawer(false)}
    //     >
    //       <Box sx={{ width: 350, padding: 3 }}>
    //         <Typography variant="h6" gutterBottom>Crear Reserva</Typography>
    //         {/* Formulario para crear reservas */}
    //         <TextField
    //           label="Lugar de Ingreso"
    //           fullWidth
    //           margin="normal"
    //         />
    //         <TextField
    //           label="Fecha y Hora"
    //           fullWidth
    //           margin="normal"
    //           type="datetime-local"
    //         />
    //         {/* Más campos aquí */}
    //         <Button variant="contained" color="primary" fullWidth>Confirmar Reserva</Button>
    //       </Box>
    //     </Drawer>
    //   </Grid>
    // </Grid>
    <></>
  );
}
