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
import { OrdersProvider } from "../../components/Orders/context/useOrderContext";
import { FiltersOrdersProvider } from "../../components/Orders/context/OrderFiltersContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MsalProvider instance={msalInstance}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <SectorPositionsProvider>
            <OrdersProvider>
              <ActivityProvider>
                <FiltersOrdersProvider>
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
                </FiltersOrdersProvider>
              </ActivityProvider>
            </OrdersProvider>
          </SectorPositionsProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </MsalProvider>
  );
}
