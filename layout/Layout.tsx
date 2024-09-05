import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Layout = ({ children }: any) => {

  return (
    <>
      <AppBar position="static" sx={{ height: '40px' }}>
        <Toolbar sx={{ minHeight: '40px' }}>
          <Typography variant="h6" component="div" sx={{ marginBottom:'20px'}}>
            Navbar
          </Typography>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
