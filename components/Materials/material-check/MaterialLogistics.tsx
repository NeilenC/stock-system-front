import { Box, Typography } from "@mui/material"
import theme from "../../../themes/theme";

const MaterialLogistics = () => {
    return(<Box sx={{display:'flex' , height:400}}>
    <Box
    sx={{
       
      width: 1,
      bgcolor: "#FFFF",
      borderRadius: 2,
    }}
  >
    {/* Title Section */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.dark,
          color: "white",
          padding: "15px",
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          paddingInline:'24px'
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Logística del material
        </Typography>
      </Box>

    {/* Content Section */}

    <Box sx={{ bgcolor: theme.palette.secondary.light, p: "7px 24px" }}>
          {" "}
          <Typography sx={{ fontSize: "18px" }}>Material</Typography>{" "}
        </Box>
        <Box sx={{p:'7px 24px'}}> aca </Box>


    {/* {error && <Box sx={{ color: 'red', mt: 2 }}>{error}</Box>} */}

  </Box>
  </Box>
)}

export default MaterialLogistics;