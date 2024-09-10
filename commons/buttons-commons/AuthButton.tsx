import { Button, Box } from "@mui/material";
import Image from "next/image";
import logo from "../../public/logo-button-solo.png"; // Ajusta la ruta del logo según tu proyecto

interface AuthButtonProps {
  handlerFunction: () => void;
  text: string;
}

function AuthButton({ handlerFunction, text }: AuthButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handlerFunction}
      sx= {{textTransform:'none'}}
    >
      {text}
    </Button>
  );
}

export default AuthButton;
