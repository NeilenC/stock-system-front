import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from '@mui/material';
import useEvent from '../../../hooks/useEvents';

const EventoFichaComercial = () => {
    const { eventFields, loading, error } = useEvent();

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error al cargar la información: {error}</Alert>;
    if (eventFields.length === 0) return <Alert severity="warning">No se encontró el evento.</Alert>;
  
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Proyecto
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          Información General
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Descripción</strong></TableCell>
                <TableCell align="right"><strong>Información</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eventFields.map((field:any, index:any) => (
                <TableRow key={index}>
                  <TableCell>{field.label}</TableCell>
                  <TableCell align="right">{field.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
};

export default EventoFichaComercial;
