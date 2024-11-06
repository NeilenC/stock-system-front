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
import space from "../../../public/sector.png";
import gestion from "../../../public/navbar/gestion.png";
import deposito from "../../../public/deposito.png";
import logo from "../../../public/navbar/logo.png";
import notifications from "../../../public/navbar/notifications.png";
import iconButton from "../../../public/plus-icon.png";
import info from "../../../public/navbar/info-icon.png";
import account from "../../../public/account2.png";
import stock from "../../../public/stockcheck.png";
import materials from "../../../public/materials.png";
import estadisticas from "../../../public/navbar/estadisticas.png";
import CustomButton from "../../../commons/buttons-commons/CustomButton";
import perfil from "../../../public/navbar/profile.png";
import logout from "../../../public/navbar/logout.png";
import ajustes from "../../../public/navbar/ajustes.png";
import roles from "../../../public/navbar/roles.png";

import theme from "../../../themes/theme";
import useWindowSize from "../../../hooks/useWindowSize";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import IconToImage from "../../../commons/styled-components/IconImages";
import { useRouter } from "next/router";
import Image from "next/image";
import { useUserStore } from "../../../zustand/useAuthStore";
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
  // const username = "Neilen Monlezun";
 // Añadido para limpiar el email
  const clearUserData = useUserStore((state) => state.clearUserData);
  const username = useUserStore((state) => state.username);


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
    if (event.currentTarget instanceof HTMLElement) {
      setAnchorEl(event.currentTarget); // Asegúrate de que sea un HTMLElement
    }
    setDropdownMenu(menu);
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };
  
  

  const handleCloseMenu = (menu: string) => {
    setAnchorEl(null); // Esto está correcto
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
      label: "Espacios",
      href: "/gestion/sectors",
      startIcon: <IconToImage icon={space.src}  w={24} h={24} />,
    },
   
    {
      label: "Depósito",
      startIcon: (
        <IconToImage icon={deposito.src}  w={24} h={24} />
      ),
      endIcon: openDropdowns["Depósito"] ? (
        <ExpandLessOutlinedIcon />
      ) : (
        <ExpandMoreOutlinedIcon />
      ),
      options: [
        {
          label: "Materiales",
          href: "/deposito/materiales",
          icon: <IconToImage icon={materials.src}  w={20} h={20} />, // Ejemplo de ícono
        },
       
      ],
    },
    
  ];

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      clearUserData();
      // Limpiar el localStorage
      localStorage.removeItem("token");

      // Redirigir al usuario a la página de login
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.dark,
        paddingInline: isMobile ? "8px" : "16px",
        paddingBlock: isMobile ? "8px" : "8px",
        zIndex: 1,
        maxHeight: "70px",
        maxWidth: "100vw",
        overflow: "hidden",
        boxSizing: "border-box",
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
          <IconToImage
            icon={logo.src}
            w={isMobile ? 120 : 150}
            h={isMobile ? 40 : 50}
          />
        </Box>

        {/* Navbar Options */}
        <Box
          display="flex"
          justifyContent={isMediumScreen ? "flex-start" : "flex-end"}
          gap={isMediumScreen ? "2px" : "20px"} // Separacion de las opciones principales
          flexGrow={1}
        >
          {navbarOptions.map((option, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: "8px",
                // bgcolor:'red',
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
                <Link
                  href={option.href}
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  {/* Opción sin submenú */}
                  <Button
                    onClick={() => setIsSelected(option.label)}
                    sx={{
                      color: theme.palette.secondary.contrastText,
                      fontSize: isMediumScreen ? "10px" : "0.8rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between", // Alineación igual a la de los botones con submenú
                      width: "100%", // Mantén el mismo ancho
                      backgroundColor:
                        isSelected === option.label
                          ? theme.palette.secondary.main
                          : "transparent",
                      borderRadius: "8px",
                      paddingInline: "16px", // Igual que los botones con submenú
                      paddingBlock: "8px", // Igual que los botones con submenú
                      boxShadow:
                        isSelected === option.label
                          ? "0px 4px 12px rgba(0, 0, 0, 0.1)" // Sombra opcional cuando está activo
                          : "none",
                    }}
                    startIcon={option.startIcon} // Mantén el icono de inicio si está presente
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
        >

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
                if (username) {
                  handleOpenMenu(e, username);
                  setIsSelected(username); // Actualiza isSelected cuando el usuario selecciona el menú
                }
              }}
              sx={{
                color: theme.palette.secondary.contrastText,
                display: "flex",
                alignItems: "center", // Alinea el contenido en el centro vertical
                fontSize:'16px',
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
                    transform: username && openDropdowns[username] ? "rotate(180deg)" : "rotate(0deg)", // Rotación de la flecha
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
                  pt:1, 
                
                }}
              >
                {/* Imagen PNG */}
                <IconToImage
                  icon={account.src}
                  w={34}
                  h={34}
                  // style={{ width: 34, height: 34, marginRight: "5px" }}
                  sx={{mr:1}}
                />

                {/* Contenido del texto */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start", 
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      lineHeight: "13px",

                      
                    }}
                  >
                    {username}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize:  "14px" ,
                      fontWeight: "regular",
                    }}
                  >
                    Ventas
                  </Typography>
                </Box>
              </Box>
            </Button>

            <Menu
              anchorEl={anchorEl || null}
              open={dropdownMenu === username}
              onClose={() => handleCloseMenu(username || '')}
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
                onClick={() => handleCloseMenu(username || "")}
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


              {/* Ajustes Option */}
              <MenuItem
                onClick={() => handleCloseMenu(username || "")}
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
                onClick={() => handleLogout()}
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
