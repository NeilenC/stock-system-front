import { Box, Collapse, IconButton, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import theme from "../../themes/theme";

const SectorItem = ({ sector, sectorRef, onToggle, open, onEditSector }: any) => {
  return (
    <Box>
      <Box
        ref={sectorRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          paddingInline: "16px",
          paddingBlock: "8px",
          borderLeft: "7px solid #E1E6EF",
          bgcolor: "#F5F5F5",
          borderBottom: "1px solid #E1E6E0",
          cursor: "pointer",
          minHeight: "50px",
        }}
        onClick={onToggle}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size="small" sx={{ p: 0, justifyContent: "center" }}>
              {open ? (
                <ArrowDropDownIcon sx={{ color: theme.palette.primary.dark }} />
              ) : (
                <ArrowRightIcon sx={{ color: "black" }} />
              )}
            </IconButton>
            <Box sx={{ display: "flex", flexDirection: "column", pl: "8px" }}>
              <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: "14px" }}>
                {sector.name}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "12px" }}>
                {sector.square_meters} m²
              </Typography>
            </Box>
          </Box>
          <IconButton size="small" sx={{ ml: 2 }} onClick={(e) => {
              e.stopPropagation();
              onEditSector(sector.id);
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ padding: "8px 72px 16px", bgcolor: "#ffff", borderRadius: "4px" }}>
          <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }}>
            Descripción
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "15px" }}>
            {sector.description}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

export default SectorItem;
