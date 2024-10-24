import React, { useState, useEffect } from 'react';
import { Grid, Menu, MenuItem } from '@mui/material';
import TextWithPopover from './TextWidthPopOver';
import IconToImage from '../../../commons/styled-components/IconImages';
import edit from '../../../public/edit.png';
import deleteicon from '../../../public/delete.png';

const TableRowItem = ({ material, onDelete, onEdit }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDescriptionClick = (event: React.MouseEvent<HTMLElement>) => {
    // Lógica para manejar clic en descripción (puedes añadirla si necesitas más funcionalidad)
  };

  const handleObservationsClick = (event: React.MouseEvent<HTMLElement>) => {
    // Lógica para manejar clic en observaciones (puedes añadirla si necesitas más funcionalidad)
  };

  const handleEditClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Abre el menú en el ícono de editar
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container spacing={1} sx={{ textAlign: 'center', borderBottom: '1px solid #ccc', padding: 1 }}>
      <Grid item xs={1}>{material.code}</Grid>
      <Grid item xs={1.5}>{material.category.category_name}</Grid>
      <TextWithPopover 
        text={material.description} 
        title="Descripción" 
        onClick={handleDescriptionClick} 
      />
      <Grid item xs={1}>{material.weight}</Grid>
      <Grid item xs={1}>{material.color}</Grid>
      <Grid item xs={1}>{material.height || 'N/A'}</Grid>
      <Grid item xs={1}>{material.depth}</Grid>
      <Grid item xs={1}>{material.actual_stock}</Grid>
      <TextWithPopover 
        text={material.observations} 
        title="Observaciones" 
        onClick={handleObservationsClick} 
      />
      <Grid item xs={1}>${material.price}</Grid>

      {/* Íconos de Editar y Eliminar */}
      <Grid item xs={0.2} sx={{ cursor: 'pointer' }}>
        <IconToImage icon={deleteicon} w={20} h={20} onClick={() => onDelete(material.id)} />
      </Grid>
      <Grid item xs={0.1} sx={{ cursor: 'pointer' }}>
        <IconToImage 
          w={20} 
          h={20} 
          icon={edit} 
          onClick={handleEditClick} // Manejador de clics para el ícono de editar
        />

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{position:'absolute'}}
        >
          <MenuItem 
            onClick={() => { 
              onEdit(material.id); // Llama a la función de edición
              handleMenuClose(); 
            }}
          >
            Editar
          </MenuItem>
          <MenuItem onClick={() => { /* Lógica para agregar stock */ handleMenuClose(); }}>
            Agregar Stock
          </MenuItem>
          <MenuItem onClick={() => { /* Lógica para remover stock */ handleMenuClose(); }}>
            Remover Stock
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default TableRowItem;
