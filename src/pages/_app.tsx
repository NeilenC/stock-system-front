import "@/styles/globals.css";
import { MsalProvider } from "@azure/msal-react";
import type { AppProps } from "next/app";
import { msalInstance } from "../../msal-config";
import { ThemeProvider } from "@mui/material";
import theme from "../../themes/theme";
import Layout from "../../layout/Layout";
import { InactivityProvider } from "../../context/InactivityProvider";
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
              <InactivityProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </InactivityProvider>
          </FiltersProvider>
          </MaterialsProvider>
        </SectorPositionsProvider>
      </ThemeProvider>
    </MsalProvider>
  );
}
