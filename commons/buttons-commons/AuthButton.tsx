import { Button, Box } from "@mui/material";

interface AuthButtonProps {
  handlerFunction: () => void;
  text: string;
}

function AuthButton({ handlerFunction, text }: AuthButtonProps) {
  return (
    <Button
      variant="contained"
      // color="primary"
      onClick={handlerFunction}
      sx= {{textTransform:'none', bgcolor:'black'}}
    >
      {text}
    </Button>
  );
}

export default AuthButton;
