import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { useRouter } from "next/router";
import theme from "../themes/theme";
import {
  CustomTextField,
  FormLabelComponent,
} from "../commons/styled-components/CustomTextFields";
import Image from "next/image"; // Importa el componente de imagen
import logo from "../public/logo-login.png"; // Asegúrate de que la ruta sea correcta
import { useUserStore } from "../zustand/useAuthStore";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const setEmailInStore = useUserStore((state) => state.setEmail);
  const setUsernameInStore = useUserStore((state) => state.setUsername);
  const setPhoneNumberInStore = useUserStore((state) => state.setPhoneNumber);
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Hubo un error. Por favor corrobore las credenciales.");
      }
  
      const data = await response.json();
  console.log("DATAAAA", data)
      if (data && data.access_token && data.user) {
        localStorage.setItem("token", data.access_token);
        setAccessToken(data.access_token);
        setEmailInStore(data.user.email); 
        setUsernameInStore(data.user.name); 
  
        router.push("/deposito/materiales");
      } else {
        throw new Error("No se recibió el token de acceso o la información del usuario.");
      }
    } catch (error: any) {
      setError(
        error.message || "Hubo un error. Por favor corrobore las credenciales."
      );
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box
      sx={{
        ".MuiContainer-root": { maxWidth: "100% !important" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: "url('/warehouseblur.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: "25%",
          paddingInline: 5,
          paddingBlock: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          zIndex: 10,
          bgcolor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <Image src={logo} alt="Logo de login" width={120} height={120} />

        {/* <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Iniciar sesión
        </Typography> */}

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <FormLabelComponent sx={{ display: "block", width: 1 }}>
          Email
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            placeholder="Ingresar Email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormLabelComponent>

        <FormLabelComponent sx={{ display: "block", width: 1, pt: 3, pb: 4 }}>
          Contraseña
          <TextField
            margin="normal"
            required
            fullWidth
            placeholder="Ingresar Contraseña"
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ zIndex: 2 }}
          />
        </FormLabelComponent>

        <Button
          type="submit"
          variant="contained"
          sx={{
            padding: "10px 0",
            mt: 1,
            borderRadius: 3,
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.light,
            fontSize: "16px",
            width: 1,
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.dark,
            },
          }}
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
