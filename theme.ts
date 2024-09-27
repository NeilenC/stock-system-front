import { createTheme } from '@mui/material/styles';
import colors from './color-palette'; // Asegúrate de usar la ruta correcta

const theme = createTheme({
  palette: {
    primary: {
      light: colors.primary.light,
      main: colors.primary.main,
      dark: colors.primary.dark,
      contrastText: colors.primary.contrastText,
    },
    secondary: {
      light: colors.secondary.light,
      main: colors.secondary.main,
      dark: colors.secondary.dark,
      contrastText: colors.secondary.contrastText,
    },
    error: {
      light: colors.error.light,
      main: colors.error.main,
      dark: colors.error.dark,
      contrastText: colors.error.contrastText,
    },
    warning: {
      light: colors.warning.light,
      main: colors.warning.main,
      dark: colors.warning.dark,
      contrastText: colors.warning.contrastText,
    },
    info: {
      light: colors.info.light,
      main: colors.info.main,
      dark: colors.info.dark,
      contrastText: colors.info.contrastText,
    },
    success: {
      light: colors.success.light,
      main: colors.success.main,
      dark: colors.success.dark,
      contrastText: colors.success.contrastText,
    },
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
  },
  typography: {
    fontFamily: 'Gotham Rounded, Arial, sans-serif',
    h6: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 400,
    },
  },
// COMPONENTES PERSONALIZADOS
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Aplicar textTransform: none a todos los botones
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          marginRight: '1px', // Ajusta este valor según tus necesidades
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // height: 'var(--EspaciostamaosSize-12)', // var(--EspaciostamaosSize-12)
          // padding: 'var(--EspaciostamaosSize-2) var(--EspaciostamaosSize-3)', // var(--EspaciostamaosSize-2) var(--EspaciostamaosSize-3)
          // gap: 'var(--EspaciostamaosSize-2) ', // var(--EspaciostamaosSize-2)
          // borderRadius: '8px 0 0 0',
          // border: '1px solid grey',
          // opacity: '0',
        },
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
