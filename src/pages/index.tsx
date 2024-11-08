import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import LoginComponent from "../../components/LoginComponent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <>
      <LoginComponent />
    </>
  );
}
