import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import TimeLine from "./linea-de-tiempo";
import LoginComponent from "../../components/LoginComponent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const [prueba, setPrueba] = useState("");

  // const getHelloWorld = async () => {
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}`, {
  //     method: "GET",
  //     mode: "cors",
  //   });
  //   const texto = await response.text();
  //   setPrueba(texto);
  // };

  // useEffect(() => {
  //   getHelloWorld();
  // }, []);
console.log("ACA")
  return (
    <>
      {/* <TimeLine/> */}
      <LoginComponent />
      {/* <Typography variant="body2">{prueba}</Typography> */}
    </>
  );
}
