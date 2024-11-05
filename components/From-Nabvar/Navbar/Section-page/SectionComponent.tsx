import { SectionComponentProps } from "./model";
import { Box, Grid, Typography } from "@mui/material";
import theme from "../../../../themes/theme";
import IconToImage from "../../../../commons/styled-components/IconImages";
import { useRouter } from "next/router";

const SectionComponent: React.FC<SectionComponentProps> = ({
  icon,
  secondaryIcon,
  text,
  children,
  hasflap,
  isId,
}) => {
  const router = useRouter()
  const handleRedirect = () => {
    if (isId) {
      router.push('/deposito/materiales');
    }
  };
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: hasflap ? "column" : "row",
        alignItems: hasflap ? "flex-start" : "center",
        backgroundColor: theme.palette.primary.main,
        justifyContent: "center",
        padding: "16px",
        zIndex: 1,
      }}
    >
      <Grid container alignItems="center">
      {icon && (
      <Box
        onClick={handleRedirect}
        sx={{
          cursor: isId ? 'pointer' : 'default',
        }}
      >
        <IconToImage icon={icon} w={40} h={40} />
      </Box>
    )}

        <Grid item marginLeft="16px">
          <Typography
            variant="h5"
            align="left"
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center", // Center vertically
              }}
            >
              <IconToImage icon={secondaryIcon} w={18} h={18} />
            </Box>
          )}
        </Grid>
      </Grid>

      <Grid item sx={{ marginLeft: hasflap ? "" : "auto" }}>
        {children}
      </Grid>
    </Box>
  );
};

export default SectionComponent;
