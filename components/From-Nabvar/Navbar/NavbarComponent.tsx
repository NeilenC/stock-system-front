import React from 'react';
import { AppBar, Grid, Typography, Menu, MenuItem, IconButton, Button, Divider, Box, useMediaQuery } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import Link from 'next/link';
import controlPanel from '../../../public/navbar/control-panel.png';
import plano from '../../../public/navbar/plano.png';
import gestion from '../../../public/navbar/gestion.png';
import deposito from '../../../public/navbar/deposito.png';
import logo from '../../../public/navbar/logo.png';
import account from '../../../public/navbar/account.png';
import notifications from '../../../public/navbar/notifications.png';
import info from '../../../public/navbar/info-icon.png';
import theme from '../../../theme';
import { useRouter } from 'next/router';
import estadisticas from '../../../public/navbar/estadisticas.png'
import CustomButton from '../../../commons/buttons-commons/CustomButton';



const NavbarComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dropdownMenu, setDropdownMenu] = React.useState<string | null>(null);
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const username = 'Nombre Usuario'; 

  const router = useRouter();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, menu: string) => {
    setAnchorEl(event.currentTarget);
    setDropdownMenu(menu);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setDropdownMenu(null);
  };

  const navbarOptions = [
    { label: 'Panel De Control', href: '/panel-de-control', startIcon: <img src={controlPanel.src} alt="Panel De Control" style={{ width: 24, height: 24 }} /> },
    { label: 'Plano', href: '/plano', startIcon: <img src={plano.src} alt="Plano" style={{ width: 24, height: 24 }} /> },
    {
      label: 'Gestión',
      startIcon: <img src={gestion.src} alt="Gestion" style={{ width: 24, height: 24 }} />,
      endIcon: <KeyboardArrowDownOutlinedIcon />,
      options: [
        { label: 'Línea de Tiempo', href: '/gestion/timeline' },
        { label: 'Listados', href: '/gestion/listings' },
        { label: 'Solicitudes', href: '/gestion/requests' },
        { label: 'Lista de Clientes', href: '/gestion/clientslist' },
        { label: 'Proveedores', href: '/gestion/suppliers' },
        { label: 'Sectores', href: '/gestion/sectors' },
        { label: <CustomButton text='Crear Reserva' />, href: '/gestion/sectors' },
      ]
    },
    {
      label: 'Depósito',
      startIcon: <img src={deposito.src} alt="Deposito" style={{ width: 24, height: 24 }} />,
      endIcon: <KeyboardArrowDownOutlinedIcon />,
      options: [
        { label: 'Subdepósito 1', href: '/deposito/subdeposito1' },
        { label: 'Subdepósito 2', href: '/deposito/subdeposito2' }
      ]
    },
    {
      label: `Estadísticas`,
      href: '/estadisticas',
      startIcon: <img src={estadisticas.src} alt="Estadisticas" style={{ width: 24, height: 24 }} />,
    },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.dark, paddingInline: '16px', paddingBlock: '8px' }}>
      <Grid container alignItems="center" justifyContent="space-between">
        {/* Logo Section */}
        <Grid item xs={2}>
          <img src={logo.src} alt="Logo La Rural" style={{ width: 150, height: '50px' }} />
        </Grid>

        {/* Navbar Options */}
        <Grid item xs={7} >
          <Grid container alignItems="center" spacing={2} justifyContent="space-between">
            {navbarOptions.map((option, index) => (
              <Grid item key={index}>
                {option.options ? (
                  <>
                    <Button
                      onClick={(e) => handleOpenMenu(e, option.label)}
                      sx={{
                        color: theme.palette.secondary.contrastText,
                        textTransform: 'none',
                        padding: '8px 16px',
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      startIcon={option.startIcon}
                      endIcon={option.endIcon}
                    >
                      {option.label}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={dropdownMenu === option.label}
                      onClose={handleCloseMenu}
                      PaperProps={{
                        style: {
                          borderRadius: 8,
                          minWidth: 200,
                        },
                      }}
                    >
                      {option.options.map((subOption, subIndex) => (
                        <MenuItem key={subIndex} onClick={handleCloseMenu}>
                          <Link href={subOption.href} passHref>
                            {subOption.label}
                          </Link>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Link href={option.href} passHref>
                    <Button
                      sx={{
                        color: theme.palette.secondary.contrastText,
                        textTransform: 'none',
                        padding: '8px 16px',
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      startIcon={option.startIcon}
                    >
                      {option.label}
                    </Button>
                  </Link>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Icons and User Section */}
        <Grid item sx={{ display: 'flex', alignItems: 'center', marginLeft: '30px' }}>
          <IconButton sx={{ color: theme.palette.secondary.contrastText }}>
            <img src={notifications.src} alt="notifications" style={{ width: 25, height: 25 }} />
          </IconButton>
          <IconButton sx={{ color: theme.palette.secondary.contrastText }}>
            <img src={info.src} alt="info" style={{ width: 20, height: 20 }} />
          </IconButton>
        </Grid>
        
        <Grid item>
          <Button
            onClick={(e) => handleOpenMenu(e, username)}
            sx={{
              color: theme.palette.secondary.contrastText,
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              padding: '8px 16px',
              fontSize: '1rem',
            }}
            startIcon={<img src={account.src} alt="account" style={{ width: 30, height: 30 }} />}
            endIcon={<KeyboardArrowDownOutlinedIcon />}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
              <Typography variant='body2'> {username} </Typography>
              <Typography variant='body2'> Ventas </Typography>
            </Box>
          </Button>
          <Menu anchorEl={anchorEl} open={dropdownMenu === username} onClose={handleCloseMenu}>
            <MenuItem onClick={handleCloseMenu}>
              <Link href="/perfil">Perfil</Link>
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>
              <Link href="/roles-permisos">Roles y Permisos</Link>
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>
              <Link href="/ajustes">Ajustes</Link>
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>
              <CustomButton text="Cerrar Sesión"  />
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default NavbarComponent;