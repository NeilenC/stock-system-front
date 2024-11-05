import React from 'react';
import { Grid, IconButton } from '@mui/material';
import FilterField from './FilterField';
import useFilters from '../../Hooks/useFilters';
import IconToImage from '../../../../../commons/styled-components/IconImages';
import clear from '../../../../../public/reset.png'
const Filters = ({ onFilter }: { onFilter: (filters: any) => void }) => {
  const {
    code,
    category,
    description,
    weight,
    color,
    height,
    depth,
    stock,
    observations,
    price,
    setCode,
    setCategory,
    setDescription,
    setWeight,
    setColor,
    setHeight,
    setDepth,
    setStock,
    setObservations,
    setPrice,
    clearFilters
  } = useFilters(onFilter);

  return (
    <Grid container  sx={{ textAlign: 'center', paddingTop:'10px', border:'1px solid  #E2E8F0',}}>
      <FilterField value={code} onChange={(e) => setCode(e.target.value)} placeholder="Código" size={1} width={100} maxLength={15} />
      <FilterField value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Categoría" size={1.5} width={150} maxLength={15} />
      <FilterField value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" size={1.5} width={150} maxLength={15} />
      <FilterField value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Peso" size={1} width={80} />
      <FilterField value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" size={1} width={80} />
      <FilterField value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Altura" size={1} width={80} />
      <FilterField value={depth} onChange={(e) => setDepth(e.target.value)} placeholder="Profundidad" size={1} width={80} />
      <FilterField value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Cantidad" size={1} width={100} />
      <FilterField value={observations} onChange={(e) => setObservations(e.target.value)} placeholder="Observaciones" size={1.5} width={150} />
      <FilterField value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Precio" size={0.9} width={100} />
      <Grid item xs={0.5} sx={{ justifyContent: 'center',  }}>
    <IconButton onClick={clearFilters} sx={{p:'5px !important'}}>
      <IconToImage icon={clear} w={32} h={32} />
    </IconButton>
  </Grid>
    </Grid>
  );
};

export default Filters;
