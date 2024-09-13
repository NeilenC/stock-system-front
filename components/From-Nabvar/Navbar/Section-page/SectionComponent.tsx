import Image from "next/image";
import { SectionComponentProps } from "./model";
import { Box, Grid, Typography } from "@mui/material";
import theme from "../../../../theme";
import zIndex from "@mui/material/styles/zIndex";

const SectionComponent: React.FC<SectionComponentProps> = ({
  icon,
  secondaryIcon,
  text,
  children,
}) => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: theme.palette.primary.main,
        justifyContent: "center",
        padding: "16px",
        zIndex: -1
      }}
    >
      <Grid container alignItems="center" justifyContent="center">
        {icon && (
          <Grid item>
            <Image src={icon} alt="Icon" width={40} height={40} />
          </Grid>
        )}

        <Grid item marginLeft="16px">
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontWeight: 700,
              fontSize: "24px",
            }}
          >
            {text}
          </Typography>
        </Grid>

        <Grid item marginLeft="16px">
          {secondaryIcon && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center', // Center vertically
              }}
            >
              <Image src={secondaryIcon} alt="Info-Icon" width={18} height={18} />
            </Box>
          )}
        </Grid>

        {children && (
          <Grid item sx={{ marginLeft: "auto" }}>
            {children}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default SectionComponent;
