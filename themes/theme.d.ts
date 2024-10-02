
declare module '@mui/material/styles' {
  interface Theme {
    widths: {
      sidebar: string;
      container: string;
     dategrid?: string

    };
  }
  // Permite configurar `widths` dentro de `createTheme`
  interface ThemeOptions {
    widths?: {
      sidebar?: string;
      container?: string;
     dategrid?: string
    };
  }
}
