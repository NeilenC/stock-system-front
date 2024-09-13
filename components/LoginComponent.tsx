import { useMsal } from "@azure/msal-react";
import { useState } from "react";
import AuthButton from "../commons/buttons-commons/AuthButton";
import { loginRequest } from "../msal-config";
import { useRouter } from "next/router";
import { Box } from "@mui/material";

const LoginComponent = () => {
  const { instance } = useMsal();
  const [userToken, setUserToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await instance.loginPopup({
        ...loginRequest,
        // prompt: "login", 
      });

      const token = response.accessToken;

      if (response) {
        const userInfo = {
          name: response.account.name ?? "Unknown user",
          email: response.account.username,
          microsoftId: response.uniqueId,
        };

        // await sendUserInfoToBackend(userInfo);

        setUserToken(token);

        router.push("/home");
      } else {
        setError("Token inválido. Por favor, inicie sesión nuevamente.");
      }
    } catch (error) {
      console.error("Error en login:", error);
      setError(
        "Ocurrió un error al intentar iniciar sesión. Intente de nuevo."
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        padding: 2,
      }}
    >
      <AuthButton
        handlerFunction={handleLogin}
        text="Iniciar sesión"
      ></AuthButton>

      {error && <p className="error-message">{error}</p>}
    </Box>
  );
};

export default LoginComponent;
