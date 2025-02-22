import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ImageToIcon from "../../../commons/styled-components/IconImages";
import theme from "../../../themes/theme";
import { useRouter } from "next/router";
import { useUserStore } from "../../../zustand/useAuthStore";
import timeline from "../../../public/navbar/timeline.png";
import listados from "../../../public/navbar/listados.png";
import solicitudes from "../../../public/navbar/solicitudes.png";
import proveedores from "../../../public/navbar/proveedores.png";
import sectores from "../../../public/navbar/sectores.png";
import listaclientes from "../../../public/navbar/listaclientes.png";
import Link from "next/link";
import controlPanel from "../../../public/navbar/control-panel.png";
import space from "../../../public/sector.png";
import spacedark from "../../../public/space.png";
import gestion from "../../../public/navbar/gestion.png";
import deposito from "../../../public/deposito.png";
import logo from "../../../public/navbar/logo.png";
import notifications from "../../../public/navbar/notifications.png";
import iconButton from "../../../public/plus-icon.png";
import info from "../../../public/navbar/info-icon.png";
import account from "../../../public/account2.png";
import calendar from "../../../public/calendar.png";
import orderlist from "../../../public/orderlist.png";
import stock from "../../../public/stockcheck.png";
import materials from "../../../public/materials.png";
import category from "../../../public/category_search.png";
import stockInventory from "../../../public/inventory.png";
import estadisticas from "../../../public/navbar/estadisticas.png";
import CustomButton from "../../../commons/buttons-commons/CustomButton";
import perfil from "../../../public/profile.png";
import logout from "../../../public/logout.png";
import tree from "../../../public/account_tree.png";
import ajustes from "../../../public/settings.png";
import roles from "../../../public/navbar/roles.png";

const NavbarComponent = () => {
  const [anchorEls, setAnchorEls] = useState<{
    [key: string]: HTMLElement | null;
  }>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // estado para la opción seleccionada
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const username = useUserStore((state) => state.username);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        console.error("Error al cerrar sesión.");
      }
      useUserStore.getState().clearUserData();
      localStorage.removeItem("token");
      console.log("Sesión cerrada correctamente.");
      router.push("/");
    } catch (error) {
      console.error("Error al procesar el cierre de sesión:", error);
    }
  };

  const navbarOptions = [
    {
      label: "Stock",
      iconSrc: deposito,
      options: [
        {
          label: "Materiales",
          href: "/stock/materiales",
          iconSrc: materials,
        },

        {
          label: "Materiales Inactivos",
          href: "/stock/materiales-inactivos",
          iconSrc: materials,
        },

        {
          label: "Categorías",
          href: "/stock/categorias",
          iconSrc: category,
        },
        {
          label: "Stock por Espacio",
          href: "/stock/espacios",
          iconSrc: stockInventory,
        },
        {
          label: "Disponibilidad de Materiales",
          href: "#",
          iconSrc: stockInventory,
        },
      ],
    },

    {
      label: "Gestión",
      iconSrc: tree,
      options: [
        {
          label: "Eventos",
          href: "/gestion/eventos",
          iconSrc: calendar,
        },
        {
          label: "Solicitud de materiales",
          href: "/gestion/pedidos",
          iconSrc: orderlist,
        },
      ],
    },
    {
      label: "Espacios",
      iconSrc: space,
      href: "/gestion/sectors",
      // options: [
      //   {
      //     label: "Administración de Espacios",
      //     iconSrc: spacedark,
      //   },

      // ],
    },
    {
      label: username,
      subLabel: "Admin",
      iconSrc: account,
      options: [
        { label: "Perfil", href: "#", iconSrc: perfil },
        { label: "Ajustes", href: "#", iconSrc: ajustes },
        { label: "Cerrar Sesión", href: "#", iconSrc: logout },
      ],
    },
  ];

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    menu: string | null
  ) => {
    if (menu) {
      setAnchorEls({ ...anchorEls, [menu]: event.currentTarget });
    }
  };

  const handleCloseMenu = (menu: string) => {
    setAnchorEls({ ...anchorEls, [menu]: null });
  };

  const handleSelectItem = (label: string) => {
    setSelectedOption(label); // Actualiza el estado cuando se selecciona una opción
  };

  const renderMenuItems = (options: any[], parentLabel: string) =>
    options.map((subOption, subIndex) => (
      <MenuItem
        key={subIndex}
        onClick={() => {
          if (subOption.label === "Cerrar Sesión") {
            handleLogout();
          } else {
            handleSelectItem(subOption.label);
            handleCloseMenu(parentLabel);
          }
        }}
        sx={{
          padding: "8px 16px",
        }}
      >
        <Link
          href={subOption.href}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ImageToIcon icon={subOption.iconSrc} w={25} h={25} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: "16px", ml: 1 }}
            >
              {subOption.label}
            </Typography>
          </Box>
        </Link>
      </MenuItem>
    ));

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.primary.dark, padding: "8px 16px" }}
    >
      <Box display="flex" alignItems="center" sx={{ width: "100%" }}>
        {/* Logo Section */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ImageToIcon icon={logo.src} w={200} h={60} />
        </Box>

        {/* Menu Options */}
        <Box
          display="flex"
          justifyContent="flex-end"
          sx={{ width: "100%", alignItems: "center" }}
        >
          {navbarOptions.map((option, index) => (
            <Box key={index} sx={{ p: "1px 6px", borderRadius: "8px" }}>
              {option.options ? (
                <>
                  <Button
                    onClick={(e) => handleOpenMenu(e, option.label ?? "")}
                    sx={{
                      color: theme.palette.secondary.contrastText,
                      fontSize: isMediumScreen ? "10px" : "16px",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor:
                        selectedOption === option.label
                          ? theme.palette.secondary.main
                          : "transparent",

                      borderRadius: "8px",
                      padding:
                        option.label === username ? "3px 8px" : "5px 10px",
                      width: 1,
                    }}
                    startIcon={
                      option.label === username ? (
                        <ImageToIcon
                          icon={option.iconSrc}
                          w={38}
                          h={38}
                          sx={{ mt: 1, mr: 0.5 }}
                        />
                      ) : (
                        <ImageToIcon
                          icon={option.iconSrc}
                          w={30}
                          h={30}
                          sx={{ mt: 1 }}
                        />
                      )
                    }
                    endIcon={
                      anchorEls[option.label ?? ""] ? (
                        <ExpandLessOutlinedIcon />
                      ) : (
                        <ExpandMoreOutlinedIcon />
                      )
                    }
                  >
                    <Box
                      sx={{
                        p: "0px !important",
                        display: "flex",
                        flexDirection: "column", // Asegura que el label y sublabel estén en columna
                        alignItems: "flex-start", // Alinea el contenido al margen izquierdo
                      }}
                    >
                      <Typography>{option.label}</Typography>
                      {option.subLabel && (
                        <Typography variant="body2" sx={{}}>
                          {option.subLabel}
                        </Typography>
                      )}
                    </Box>
                  </Button>
                  <Menu
                    anchorEl={anchorEls[option.label ?? ""]}
                    open={Boolean(anchorEls[option.label ?? ""])}
                    onClose={() => handleCloseMenu(option.label ?? "")}
                    PaperProps={{
                      style: { borderRadius: 8, minWidth: "224px" },
                    }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                  >
                    {renderMenuItems(option.options, option.label ?? "")}
                  </Menu>
                </>
              ) : (
                  <Link
                    href={option.href}
                    passHref
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      onClick={() => handleSelectItem(option.label)}
                      sx={{
                        color: theme.palette.secondary.contrastText,
                        fontSize: isMediumScreen ? "14px" : "18px",
                        display: "flex",
                        alignItems: "center",
                        // backgroundColor:
                        //   selectedOption === option.label
                        //     ? theme.palette.secondary.main
                        //     : "transparent",
                        borderRadius: "8px",
                        padding: "10px 16px",
                        width: 1,
                      }}
                      startIcon={
                        <ImageToIcon
                          icon={option.iconSrc}
                          w={26}
                          h={26}
                          sx={{ mt: 1 }}
                        />
                      }
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, fontSize: "16px" }}
                      >
                        {option.label}
                      </Typography>
                    </Button>
                  </Link>
                )
              }
            </Box>
          ))}
        </Box>
      </Box>
    </AppBar>
  );
};

export default NavbarComponent;
