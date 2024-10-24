import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          {/* Agregar el enlace de Google Fonts aquí */}
          <link
            href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
            rel="stylesheet"
          />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
