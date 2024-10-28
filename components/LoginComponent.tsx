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
import { CustomTextField, FormLabelComponent } from "../commons/styled-components/CustomTextFields";
import Image from 'next/image'; // Importa el componente de imagen
import logo from '../public/logo-login.png'; // Asegúrate de que la ruta sea correcta

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

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
      console.log("Login success:", data);

      if (data && data.access_token) {
        localStorage.setItem("token", data.access_token);
        router.push("/home");
      } else {
        throw new Error("No se recibió el token de acceso.");
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
    <Box sx={{
      '.MuiContainer-root': { maxWidth:'100% !important' },
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundImage: "url('/bgimage.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>


      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: "33%",
          paddingInline: 5, 
          paddingBlock: 3, 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          zIndex: 10,
          bgcolor: 'rgba(255, 255, 255, 0.5)',
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

        <Box sx={{ width: "100%" }}>
          <FormLabelComponent sx={{ display: "block" }}>
            Email
          </FormLabelComponent>
          <CustomTextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            placeholder='Ingresar Email'
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           
          />
        </Box>

        <Box sx={{ width: "100%"}}>
          <FormLabelComponent sx={{ display: "block" }}>
            Contraseña
          </FormLabelComponent>
          <CustomTextField
            margin="normal"
            required
            fullWidth
            placeholder='Ingresar Contraseña'
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            padding: "10px 0",
            mt:1,
            borderRadius: 3,
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.light,
            fontSize: '16px',
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
