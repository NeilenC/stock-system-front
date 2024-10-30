import React, { useState, useEffect } from 'react';
import { Grid, Menu, MenuItem } from '@mui/material';
import TextWithPopover from './components/TextWidthPopOver';
import IconToImage from '../../../commons/styled-components/IconImages';
import edit from '../../../public/edit.png';
import deleteicon from '../../../public/delete.png';
import AdjustStock from './AdjustStock';

const TableRowItem = ({ material, openDeleteModal, onEdit, index }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [stockAdjustmentType, setStockAdjustmentType] = useState<'add' | 'remove' | null>(null);
  const [updatedMaterial, setUpdatedMaterial] = useState(material);

  const handleStockUpdate = (newStock: number) => {
    setUpdatedMaterial({ ...updatedMaterial, actual_stock: newStock });
  };
console.log("updatedmaterial", updatedMaterial.actual_stock)
  const handleStockChangeClick = (type: 'add' | 'remove') => {
    setStockAdjustmentType(type);
    setIsStockModalOpen(true);
  };

  const handleStockModalClose = () => {
    setIsStockModalOpen(false);
    setStockAdjustmentType(null);
  };

  const handleDescriptionClick = (event: React.MouseEvent<HTMLElement>) => {
    // Lógica para manejar clic en descripción (puedes añadirla si necesitas más funcionalidad)
  };

  const handleObservationsClick = (event: React.MouseEvent<HTMLElement>) => {
    // Lógica para manejar clic en observaciones (puedes añadirla si necesitas más funcionalidad)
  };

  const handleEditClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Abre el menú en el ícono de editar
    console.log("anchorel", anchorEl)
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container spacing={1} sx={{ textAlign: 'center', borderBottom: '1px solid #ccc', paddingBlock: 1.2 , bgcolor: index % 2 === 0 ? '#f5f5f5' : '#ffffff'}}>
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
      {/* <Grid item xs={1}>{material.actual_stock}</Grid> */}
      <Grid item xs={1}>{updatedMaterial.actual_stock}</Grid>
      <TextWithPopover 
        text={material.observations} 
        title="Observaciones" 
        onClick={handleObservationsClick} 
      />
      <Grid item xs={1}>${material.price}</Grid>

      {/* Íconos de Editar y Eliminar */}
      <Grid item xs={0.2} sx={{ cursor: 'pointer' }}>
        <IconToImage icon={deleteicon} w={20} h={20} onClick={openDeleteModal} />
      </Grid>
      <Grid item xs={0.1} sx={{ cursor: 'pointer', position: 'relative' }}>
  <IconToImage 
    w={20} 
    h={20} 
    icon={edit} 
    onClick={handleEditClick}
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
  sx={{ zIndex: 9999 }}
>

          <MenuItem 
            onClick={() => { 
              onEdit(material.id); 
              handleMenuClose(); 
            }}
          >
            Editar
          </MenuItem>
          <MenuItem onClick={() => { handleStockChangeClick('add'); handleMenuClose(); }}>
              Agregar Stock
            </MenuItem>
            <MenuItem onClick={() => { handleStockChangeClick('remove'); handleMenuClose(); }}>
              Remover Stock
            </MenuItem>
        </Menu>

           {/* Modal para ajustar stock */}
      {isStockModalOpen && (
        <AdjustStock 
          isOpen={isStockModalOpen} 
          handleClose={handleStockModalClose} 
          material={material} 
          adjustmentType={stockAdjustmentType} 
          onStockUpdate={handleStockUpdate}
        />
      )}
      </Grid>
    </Grid>
  );
};

export default TableRowItem;
