import { useMsal } from "@azure/msal-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const Home = () => {
  // const { instance, accounts } = useMsal();
  const [prueba, setPrueba] = useState("");
  const router = useRouter();

  // const handleLogout = () => {
  //   instance
  //     .logoutPopup()
  //     .then(() => {
  //       console.log("Logout successful");
  //       router.push("/");
  //     })
  //     .catch((e) => {
  //     });
  // };

  const getHelloWorld = async () => {
    const response = await fetch(`${process.env.API_BASE}`, { method: "GET" });
    const texto = await response.text();
    setPrueba(texto);
  };

  useEffect(() => {
    getHelloWorld();
  }, []);

  return (
    <Box>
      HOME
      {/* <Typography variant="h5">{prueba}</Typography> */}
      {/* <AuthButton handlerFunction={handleLogout} text="Cerrar sesión" /> */}
    </Box>
  );
};

export default Home;
