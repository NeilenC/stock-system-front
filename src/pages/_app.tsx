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
import { useMaterialStore } from "../../zustand/materialStore";
import { MaterialsProvider } from "../../components/Materials/Table/context/MaterialsContextProps";
import { useEffect, useState } from "react";
import { MaterialProps } from "../../components/Materials/materialsProps";

export default function App({ Component, pageProps }: AppProps) {
  const [materials, setMaterials] = useState<MaterialProps[]>([]);
  const fetchMaterials = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/materials/isActive`);
      const data = await response.json();

      setMaterials(data);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    }
  };
  useEffect(() => {

    fetchMaterials();
  }, []); 
  return (
    <MsalProvider instance={msalInstance}>
      <ThemeProvider theme={theme}>
        <SectorPositionsProvider>
        <MaterialsProvider materials={materials}>
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
