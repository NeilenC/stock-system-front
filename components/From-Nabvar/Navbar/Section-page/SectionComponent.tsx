import { SectionComponentProps } from "./model";
import { Box, Grid, Typography } from "@mui/material";
import theme from "../../../../theme";
import IconToImage from "../../../../commons/styled-components/IconImages";

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
            <IconToImage icon={icon} w={40} h={40} />
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
              <IconToImage icon={secondaryIcon} w={18} h={18} />
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
