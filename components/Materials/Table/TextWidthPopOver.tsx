import React, { useState } from 'react';
import { Grid, Popover, Typography } from '@mui/material';

const TextWithPopover = ({ text, title, onClick }: { text: string | null; title: string; onClick: (event: React.MouseEvent<HTMLElement>) => void; }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    onClick(event);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? `${title}-popover` : undefined;

  return (
    <>
      <Grid
        item
        xs={1.5}
        onClick={handleClick}
        sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}
      >
        {text || 'N/A'}
      </Grid>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>{text}</Typography>
      </Popover>
    </>
  );
};

export default TextWithPopover;
