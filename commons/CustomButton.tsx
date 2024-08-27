import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const CustomButtonComponent = () => (
    <>
  <CustomButton variant="contained">Boton personalizado</CustomButton>
  <Button
      sx={{
        backgroundColor: theme => theme.palette.primary.light,
        color: theme => theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme => theme.palette.success.light,
        },
      }}
    >
      OTRO MAS
    </Button>
    </>
);

export default CustomButtonComponent;
