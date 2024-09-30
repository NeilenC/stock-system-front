import "@/styles/globals.css";
import { MsalProvider } from "@azure/msal-react";
import type { AppProps } from "next/app";
import { msalInstance } from "../../msal-config";
import { ThemeProvider } from "@mui/material";
import theme from "../../theme";
import Layout from "../../layout/Layout";
import { InactivityProvider } from "../../context/InactivityProvider";
import { SectorPositionsProvider } from "../../context/SectorPositionsProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MsalProvider instance={msalInstance}>
      <ThemeProvider theme={theme}>
        <SectorPositionsProvider>

        <InactivityProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </InactivityProvider>
        </SectorPositionsProvider>
      </ThemeProvider>
    </MsalProvider>
  );
}
