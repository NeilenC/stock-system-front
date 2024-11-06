import "@/styles/globals.css";
import { MsalProvider } from "@azure/msal-react";
import type { AppProps } from "next/app";
import { msalInstance } from "../../msal-config";
import { ThemeProvider } from "@mui/material";
import theme from "../../themes/theme";
import Layout from "../../layout/Layout";
import { SectorPositionsProvider } from "../../context/SectorPositionsProvider";
import { FiltersProvider } from "../../components/Materials/Table/context/FiltersContext";
import { MaterialsProvider } from "../../components/Materials/Table/context/MaterialsContextProps";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <MsalProvider instance={msalInstance}>
      <ThemeProvider theme={theme}>
        <SectorPositionsProvider>
        <MaterialsProvider >
          <FiltersProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
          </FiltersProvider>
          </MaterialsProvider>
        </SectorPositionsProvider>
      </ThemeProvider>
    </MsalProvider>
  );
}
