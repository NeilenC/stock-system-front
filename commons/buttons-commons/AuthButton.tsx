import { useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

interface AuthButtonProps {
  handlerFunction: () => void;
  text: string;
}

function AuthButton({ handlerFunction, text }: AuthButtonProps) {
  return (
    <Button variant="contained" color="primary" onClick={handlerFunction}>
      {text}
    </Button>
  );
}

export default AuthButton;
