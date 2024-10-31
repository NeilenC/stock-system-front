import { Box, Collapse, IconButton, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import theme from "../../themes/theme";
import { useState } from "react";
import SectorItem from "./SectorItem";

const Category = ({ category, sectors, sectorRefs, sectorPositions, setSectorPositions, onEditSector, onDelete }: any) => {
  const [open, setOpen] = useState(true);
  const [openSectors, setOpenSectors] = useState<number[]>([]);

  const handleToggleCategory = () => {
    setOpen((prev) => !prev);
  };

  const handleToggleSector = (sectorId: number) => {
    setOpenSectors((prev) => {
      if (prev.includes(sectorId)) {
        return prev.filter((id) => id !== sectorId);
      }
      return [...prev, sectorId];
    });
  };


console.log(sectors)
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.dark,
          paddingBlock: "8px",
          maxHeight: "40px",
          paddingInline: "16px",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handleToggleCategory}
      >
        <IconButton size="small" sx={{ color: "#fff", p: 0 }}>
          {open ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </IconButton>
        <Typography variant="body1" sx={{ color: "#fff", fontWeight: "bold", pl: "12px" }}>
          {category}
        </Typography>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {sectors.map((sector:any) => (
          <SectorItem
            key={sector.id}
            sector={sector}
            sectorRef={(el:any) => (sectorRefs.current[sector.id] = el)}
            onToggle={() => handleToggleSector(sector.id)}
            open={openSectors.includes(sector.id)}
            onEditSector={onEditSector}
            onDelete={onDelete}
          />
        ))}
      </Collapse>
    </Box>
  );
};

export default Category;
