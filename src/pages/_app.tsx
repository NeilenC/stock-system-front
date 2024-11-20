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
import { ModalProvider } from "../../components/Materials/Table/context/ModalContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ActivityProvider } from "../../components/Activities/Activities-table/context/useActivitiesContext";
import { FiltersActivProvider } from "../../components/Activities/Activities-table/context/ActivityFiltersContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MsalProvider instance={msalInstance}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <SectorPositionsProvider>
            <ActivityProvider>
              <ModalProvider>
                <FiltersActivProvider>
                  <MaterialsProvider>
                    <FiltersProvider>
                      <Layout>
                        <Component {...pageProps} />
                      </Layout>
                    </FiltersProvider>
                  </MaterialsProvider>
                </FiltersActivProvider>
              </ModalProvider>
            </ActivityProvider>
          </SectorPositionsProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </MsalProvider>
  );
}
