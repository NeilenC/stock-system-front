import { Box } from '@mui/material';
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
    <Box sx={{margin: '10px'}}>
  <CustomButton variant="contained">Boton personalizado</CustomButton>
  <CustomButton
      sx={{
        backgroundColor: theme => theme.palette.primary.main,
        color: theme => theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme => theme.palette.success.light,
        },
        marginLeft: '5px'
      }}
    >
      OTRO MAS
    </CustomButton>
    </Box>

);

export default CustomButtonComponent;
