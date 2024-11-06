
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

// Envuelve el componente con React.forwardRef
const IconToImage = React.forwardRef<HTMLDivElement, { icon: any, w: number, h: number, onClick?: any , sx?:any}>(({ icon, w, h, onClick, sx }, ref) => {
  return (
    <Box ref={ref} onClick={onClick} sx={sx}>
      <Image src={icon} alt="Icon" width={w} height={h} />
    </Box>
  );
});

// Es importante asignar displayName para componentes con forwardRef
IconToImage.displayName = "IconToImage";

export default IconToImage;
