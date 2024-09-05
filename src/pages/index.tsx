import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Login from "../../components/Login";
import CustomButtonComponent from "../../commons/CustomButton";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [prueba, setPrueba] = useState("");

  const getHelloWorld = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}`, { method: "GET" });
    const texto = await response.text();
    setPrueba(texto);
  };

  useEffect(() => {
    getHelloWorld();
  }, []);


  return (
    <>
      {/* <Login /> */}
      {/* <Home/> */}
      <Typography variant="body2">{prueba}</Typography>
      <CustomButtonComponent/>
    </>
  );
}
