import React, { useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import timeline from "../../../public/navbar/timeline.png";
import listados from "../../../public/navbar/listados.png";
import solicitudes from "../../../public/navbar/solicitudes.png";
import proveedores from "../../../public/navbar/proveedores.png";
import sectores from "../../../public/navbar/sectores.png";
import listaclientes from "../../../public/navbar/listaclientes.png";
import Link from "next/link";
import controlPanel from "../../../public/navbar/control-panel.png";
import plano from "../../../public/navbar/plano.png";
import gestion from "../../../public/navbar/gestion.png";
import deposito from "../../../public/navbar/deposito.png";
import logo from "../../../public/navbar/logo.png";
import notifications from "../../../public/navbar/notifications.png";
import iconButton from "../../../public/plus-icon.png";
import info from "../../../public/navbar/info-icon.png";
import account from "../../../public/navbar/account.png";
import estadisticas from "../../../public/navbar/estadisticas.png";
import CustomButton from "../../../commons/buttons-commons/CustomButton";
import perfil from "../../../public/navbar/profile.png";
import logout from "../../../public/navbar/logout.png";
import ajustes from "../../../public/navbar/ajustes.png";
import roles from "../../../public/navbar/roles.png";

import theme from "../../../theme";
import useWindowSize from "../../../hooks/useWindowSize";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import IconToImage from "../../../commons/styled-components/IconImages";
import { useRouter } from "next/router";
const NavbarComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dropdownMenu, setDropdownMenu] = React.useState<string | null>(null);
  const router = useRouter();

  const [openDropdowns, setOpenDropdowns] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [isSelected, setIsSelected] = React.useState<string | null>(null);
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useWindowSize().width <= 1025;
  const username = "Nombre Usuario";

  useEffect(() => {
    // Detect route change and reset isSelected state after 2 seconds
    const handleRouteChange = () => {
      setTimeout(() => {
        setIsSelected(null);
      }, 1000);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // Cleanup event listener when component unmounts
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    menu: string
  ) => {
    setAnchorEl(event.currentTarget);
    setDropdownMenu(menu);
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu], // Toggle open/close value
    }));
  };

  const handleCloseMenu = (menu: string) => {
    setAnchorEl(null);
    setDropdownMenu(null);
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [menu]: false,
    }));
  };

  const handleSelectItem = (label: string, menu: string) => {
    setIsSelected(label);
    handleCloseMenu(menu);
  };

  const navbarOptions = [
    {
      label: "Panel De Control",
      href: "/panel-de-control",
      startIcon: (
        <img
          src={controlPanel.src}
          alt="Panel De Control"
          style={{ width: 24, height: 24 }}
        />
      ),
    },
    {
      label: "Plano",
      href: "/plano",
      startIcon: (
        <img src={plano.src} alt="Plano" style={{ width: 24, height: 24 }} />
      ),
    },
    {
      label: "Gestión",
      startIcon: (
        <img
          src={gestion.src}
          alt="Gestion"
          style={{ width: 24, height: 24 }}
        />
      ),
      endIcon: openDropdowns["Gestión"] ? (
        <ExpandLessOutlinedIcon />
      ) : (
        <ExpandMoreOutlinedIcon />
      ),
      options: [
        {
          label: "Línea de Tiempo",
          href: "/gestion/timeline",
          icon: <IconToImage icon={timeline} w={20} h={20} />, // Ejemplo de ícono
        },
        {
          label: "Listados",
          href: "/gestion/listings",
          icon: <IconToImage icon={listados} w={20} h={20} />, // Ejemplo de ícono
        },
        {
          label: "Solicitudes",
          href: "/gestion/requests",
          icon: <IconToImage icon={solicitudes} w={20} h={20} />, // Ejemplo de ícono
        },
        {
          label: "Lista de Clientes",
          href: "/gestion/clientslist",
          icon: <IconToImage icon={listaclientes} w={20} h={20} />, // Ejemplo de ícono
        },
        {
          label: "Proveedores",
          href: "/gestion/suppliers",
          icon: <IconToImage icon={proveedores} w={20} h={20} />, // Ejemplo de ícono
        },
        {
          label: "Sectores",
          href: "/gestion/sectors",
          icon: <IconToImage icon={sectores} w={20} h={20} />, // Ejemplo de ícono
        },
      ],
    },
    {
      label: "Depósito",
      startIcon: (
        <img
          src={deposito.src}
          alt="Deposito"
          style={{ width: 24, height: 24 }}
        />
      ),
      endIcon: openDropdowns["Depósito"] ? (
        <ExpandLessOutlinedIcon />
      ) : (
        <ExpandMoreOutlinedIcon />
      ),
      options: [
        {
          label: "Subdepósito 1",
          href: "/deposito/subdeposito1",
          icon: <KeyboardArrowDownOutlinedIcon />, // Ejemplo de ícono
        },
        {
          label: "Subdepósito 2",
          href: "/deposito/subdeposito2",
          icon: <KeyboardArrowDownOutlinedIcon />, // Ejemplo de ícono
        },
      ],
    },
    {
      label: "Estadísticas",
      href: "/estadisticas",
      startIcon: (
        <img
          src={estadisticas.src}
          alt="Estadisticas"
          style={{ width: 24, height: 24 }}
        />
      ),
    },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.dark,
        paddingInline: isMobile ? "8px" : "16px",
        paddingBlock: isMobile ? "8px" : "8px",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        {/* Logo Section */}
        <Box>
          <img
            src={logo.src}
            alt="Logo La Rural"
            style={{ width: isMobile ? 120 : 150, height: isMobile ? 40 : 50 }}
          />
        </Box>

        {/* Navbar Options */}
        <Box
          display="flex"
          justifyContent={isMediumScreen ? "flex-start" : "center"}
          gap={isMediumScreen ? "2px" : "25px"} // Separacion de las opciones principales
          flexGrow={1}
        >
          {navbarOptions.map((option, index) => (
            <Box
              key={index}
              sx={{
                // bgcolor:"pink",
                borderRadius: "8px",
                p: isMobile ? "0px" : "1px 6px",
              }}
            >
              {option.options ? (
                <>
                  <Button
                    onClick={(e) => {
                      handleOpenMenu(e, option.label); // Controla la apertura/cierre del menú
                      setIsSelected(option.label); // Cambia el estado seleccionado
                    }}
                    sx={{
                      color: theme.palette.secondary.contrastText,
                      textTransform: "none",
                      fontSize: isMediumScreen ? "10px" : "0.8rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      backgroundColor:
                        isSelected === option.label
                          ? theme.palette.secondary.main
                          : "transparent",
                      borderRadius: "8px",
                      paddingInline: "16px",
                      paddingBlock: "8px",
                      boxShadow:
                        isSelected === option.label
                          ? "0px 4px 12px rgba(0, 0, 0, 0.1)"
                          : "none", // Sombra opcional cuando está activo
                    }}
                    startIcon={option.startIcon}
                    endIcon={
                      <Box
                        sx={{
                          display: "flex",
                          fontSize: isMediumScreen ? "10px" : "0.8rem",
                          alignItems: "center",
                          transition: "transform 0.3s ease",
                          transform: openDropdowns[option.label]
                            ? "rotate(180deg)" // Flecha hacia arriba si está abierto
                            : "rotate(0deg)", // Flecha hacia abajo si está cerrado
                        }}
                      >
                        <ExpandMoreOutlinedIcon />
                      </Box>
                    }
                  >
                    {option.label}
                  </Button>

                  {/* Menú desplegable */}
                  <Box>
                    <Menu
                      anchorEl={anchorEl}
                      open={dropdownMenu === option.label}
                      onClose={() => handleCloseMenu(option.label)}
                      PaperProps={{
                        style: {
                          borderRadius: 8,
                          minWidth: "224px",
                          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
                          paddingBlock: "0",
                        },
                      }}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      sx={{ mt: "8px" }}
                    >
                      <Box>
                        {option.options.map((subOption, subIndex) => (
                          <MenuItem
                            key={subIndex}
                            onClick={() =>
                              handleSelectItem(subOption.label, option.label)
                            }
                            sx={{
                              padding: "8px 16px",
                              "&:hover": {
                                backgroundColor: theme.palette.action.hover,
                              },
                            }}
                          >
                            <Link
                              href={subOption.href}
                              style={{
                                textTransform: "none",
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                }}
                              >
                                {subOption.icon && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      mr: "12px",
                                    }}
                                  >
                                    {subOption.icon}
                                  </Box>
                                )}
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: 500,
                                    fontSize: "14px",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {subOption.label}
                                </Typography>
                              </Box>
                            </Link>
                          </MenuItem>
                        ))}
                        {/* adding button at the end of the menu in "Gestión" option  */}
                        {option.label === "Gestión" && (
                          <Box
                            sx={{
                              paddingBlock: "0",
                              paddingInline: "8px",
                              paddingTop: "8px",
                              width: "208px",
                              borderTop: "1px solid #E1E6EF",
                              mt: "8px",
                            }}
                          >
                            <CustomButton
                              text="Crear Reserva"
                              icon={iconButton}
                            />
                          </Box>
                        )}
                      </Box>
                    </Menu>
                  </Box>
                </>
              ) : (
                <Link href={option.href} passHref>
                  {/* Opción sin submenú */}
                  <Button
                    onClick={() => setIsSelected(option.label)}
                    sx={{
                      color: theme.palette.secondary.contrastText,
                      textTransform: "none",
                      fontSize: isMediumScreen ? "10px" : "0.8rem",

                      // display: "flex",
                      // alignItems: "center",
                      backgroundColor:
                        isSelected === option.label
                          ? theme.palette.secondary.main
                          : "transparent",
                      borderRadius: "8px",
                      paddingInline: "16px",
                      paddingBlock: "8px",
                    }}
                    startIcon={option.startIcon}
                  >
                    {option.label}
                  </Button>
                </Link>
              )}
            </Box>
          ))}
        </Box>

        {/* Icons and User Section */}
        <Box
          display="flex"
          alignItems="center"
          marginLeft={isMobile ? "0px" : "2px"}
        >
          {/* Icons */}
          <Box display="flex" alignItems="center">
            <IconButton sx={{ color: theme.palette.secondary.contrastText }}>
              <img
                src={notifications.src}
                alt="notifications"
                style={{
                  width: isMobile ? 18 : 21,
                  height: isMobile ? 18 : 21,
                }}
              />
            </IconButton>
            <IconButton sx={{ color: theme.palette.secondary.contrastText }}>
              <img
                src={info.src}
                alt="info"
                style={{ width: 20, height: 20 }}
              />
            </IconButton>
          </Box>

          {/* User Section */}
          <Box
            sx={{
              backgroundColor:
                isSelected === username
                  ? theme.palette.secondary.main
                  : "transparent",
              borderRadius: "8px",
              // p: isMobile ? "0px" : "0px 6px",
              paddingInline: "8px",
            }}
          >
            <Button
              onClick={(e) => {
                handleOpenMenu(e, username);
                setIsSelected(username); // Actualiza isSelected cuando el usuario selecciona el menú
              }}
              sx={{
                color: theme.palette.secondary.contrastText,
                textTransform: "none",
                display: "flex",
                alignItems: "center", // Alinea el contenido en el centro vertical
                backgroundColor:
                  isSelected === username
                    ? theme.palette.secondary.main
                    : "transparent", // Cambia el fondo cuando se selecciona
                paddingBlock: "2px",
              }}
              endIcon={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    transition: "transform 0.3s ease", // Transición suave
                    transform: openDropdowns[username]
                      ? "rotate(180deg)"
                      : "rotate(0deg)", // Rotación de la flecha
                  }}
                >
                  <KeyboardArrowDownOutlinedIcon />
                </Box>
              }
            >
              {/* Contenedor para la imagen y el texto */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center", // Alinea imagen y texto en el mismo nivel
                }}
              >
                {/* Imagen PNG */}
                <img
                  src={account.src}
                  alt="info"
                  style={{ width: 34, height: 34, marginRight: "5px" }}
                />

                {/* Contenido del texto */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    // paddingLeft: '12px'
                    p: "5px 0px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: isMediumScreen ? "10px" : "0.7rem",
                      lineHeight: "13px",
                    }}
                  >
                    {username}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: isMediumScreen ? "10px" : "0.7rem",
                      fontWeight: "regular",
                    }}
                  >
                    Ventas
                  </Typography>
                </Box>
              </Box>
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={dropdownMenu === username}
              onClose={() => handleCloseMenu(username)}
              PaperProps={{
                style: {
                  borderRadius: 8,
                  minWidth: "200px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for a modern look
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              sx={{ mt: "8px" }} // Space between button and menu
            >
              {/* Perfil Option */}
              <MenuItem
                onClick={() => handleCloseMenu(username)}
                sx={{
                  padding: "10px 16px", // Padding adjustment
                  "&:hover": {
                    backgroundColor: "#F5F5F5", // Background hover color
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: "36px" }}>
                  <IconToImage icon={perfil} w={20} h={20} />
                </ListItemIcon>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, fontSize: "14px" }}
                >
                  Perfil
                </Typography>
              </MenuItem>

              {/* Roles y Permisos Option */}
              <MenuItem
                onClick={() => handleCloseMenu(username)}
                sx={{
                  padding: "10px 16px",
                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: "36px" }}>
                  <IconToImage icon={roles} w={20} h={20} />
                </ListItemIcon>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, fontSize: "14px" }}
                >
                  Roles Y Permisos
                </Typography>
              </MenuItem>

              {/* Ajustes Option */}
              <MenuItem
                onClick={() => handleCloseMenu(username)}
                sx={{
                  padding: "10px 16px",
                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: "36px" }}>
                  <IconToImage icon={ajustes} w={20} h={20} />
                </ListItemIcon>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, fontSize: "14px" }}
                >
                  Ajustes
                </Typography>
              </MenuItem>

              {/* Cerrar Sesión Option */}
              <MenuItem
                onClick={() => handleCloseMenu(username)}
                sx={{
                  padding: "10px 16px",
                  borderTop: "1px solid #E0E0E0", // Divider at the top
                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: "36px" }}>
                  <IconToImage icon={logout} w={20} h={20} />
                </ListItemIcon>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, fontSize: "14px" }}
                >
                  Cerrar Sesión
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
};

export default NavbarComponent;
