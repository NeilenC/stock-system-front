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
import { FormLabelComponent } from "../commons/styled-components/CustomTextFields";

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
        // Guardar el token en localStorage
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
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: "40%",
          p: 5, 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Sombra suave
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Iniciar sesión
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ width: "100%",mb: 2 ,  }}>
          <FormLabelComponent sx={{ display: "block"}}>
            Email
          </FormLabelComponent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                borderRadius: 2,
              },
            }}
          />
        </Box>

        <Box sx={{ width: "100%", mb: 2 }}>
          <FormLabelComponent sx={{ display: "block"}}>
            Contraseña
          </FormLabelComponent>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                borderRadius: 2, 
                
              },
            }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            padding: "10px 0",
            borderRadius: 2,
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.light,
            fontSize:'16px',
            width:1,
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
    </Container>
  );
};

export default Login;
