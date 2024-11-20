import { Box, Typography } from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import theme from "../../../../themes/theme";

const TitleComponent = ({ text, sx, ...props }: any) => {
    return (
      <Box
        sx={{
          bgcolor: theme.palette.primary.dark,
          gap: "4.07px",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "white",
            weight: 400,
            fontSize: "18px",
            lineHeight: "22px",
            // marginTop: 2,
            marginBottom: '24px',
            p: "8px 16px",
            ...sx, // Allows to add others styles if its necessary
          }}
          {...props}
        >
          {text}
        </Typography>
      </Box>
    );
  };

  
  const SecondTitleComponent = ({ text, open, sx, ...props }: any) => {
    return (
      <Box sx={{ paddingBottom: '24px' }}>
        <Box
          sx={{
            bgcolor: theme.palette.primary.light,
            gap: '4.07px',
            borderRadius: '8px',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'black',
              cursor: 'pointer',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              lineHeight: '22px',
              p: '8px 16px',
              ...sx,
            }}
            {...props}
          >
            {text}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: 'auto',
                transition: 'transform 0.3s ease', // Suave transición de rotación
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)', // Rotación dependiendo del estado
              }}
            >
              <ExpandMoreOutlinedIcon />
            </Box>

            

            
          </Typography>
        </Box>
      </Box>
    );
  };

  

  export { TitleComponent, SecondTitleComponent };