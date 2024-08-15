import "@/styles/globals.css";
import { MsalProvider } from "@azure/msal-react";
import type { AppProps } from "next/app";
import { msalInstance } from "../../msal-config";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MsalProvider instance={msalInstance}>
      <Component {...pageProps} />
    </MsalProvider>
  );
}
