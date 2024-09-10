import React from 'react';
import { AppBar, Grid, Typography, Menu, MenuItem, IconButton, Button } from '@mui/material';
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

const NavbarComponent = ({ children }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dropdownMenu, setDropdownMenu] = React.useState<string | null>(null);

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
        { label: 'Subgestión 1', href: '/gestion/subgestion1' },
        { label: 'Subgestión 2', href: '/gestion/subgestion2' }
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
  ]

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.dark, paddingInline: '16px', paddingBlock: '8px' }}>
      <Grid container alignItems="center" spacing={2} wrap="wrap">
        {/* Logo Section */}
        <Grid item xs={6} sm={4} md={2}>
          <img src={logo.src} alt="Logo La Rural" style={{ width: 150, height: '50px' }} />
        </Grid>

        {/* Navbar Options */}
        <Grid item xs={12} sm={8} md={7}>
          <Grid container alignItems="center" justifyContent={{ xs: 'center', md: 'flex-end' }} spacing={2}>
            {navbarOptions.map((option, index) => (
              <Grid item key={index} sx={{paddingInline: '12px'}}>
                {option.options ? (
                  <>
                    <Button
                      onClick={(e) => handleOpenMenu(e, option.label)}
                      sx={{ color: theme.palette.primary.contrastText, textTransform: 'none' }}
                      startIcon={option.startIcon}
                      endIcon={option.endIcon}
                    >
                      
                      {option.label}
                    </Button>
                    <Menu anchorEl={anchorEl} open={dropdownMenu === option.label} onClose={handleCloseMenu}>
                      {option.options.map((subOption, subIndex) => (
                        <MenuItem key={subIndex} onClick={handleCloseMenu}>
                          <Link href={subOption.href}>{subOption.label}</Link>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Link href={option.href} passHref>
                    <Button sx={{ color: theme.palette.primary.contrastText, textTransform: 'none' }} startIcon={option.startIcon}>
                      {option.label}
                    </Button>
                  </Link>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Icons Section */}
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, alignItems: 'center' }}>
          <IconButton sx={{ color: theme.palette.primary.contrastText }}>
            <img src={notifications.src} alt="notifications" style={{ width: 25, height: 25 }} />
          </IconButton>
          <IconButton>
            <img src={info.src} alt="info" style={{ width: 20, height: 20 }} />
          </IconButton>
          <IconButton>
            <img src={account.src} alt="account" style={{ width: 30, height: 30 }} />
          </IconButton>
          <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '13px', paddingInline: '3px' }}>
            Nombre Usuario
            <br />
            Ventas
          </Typography>
          <KeyboardArrowDownOutlinedIcon sx={{ paddingInline: '2px' }} />
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default NavbarComponent;
