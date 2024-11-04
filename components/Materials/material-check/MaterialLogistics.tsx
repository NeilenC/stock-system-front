import { Box, Divider, Typography } from "@mui/material";
import theme from "../../../themes/theme";
import { MaterialProps } from "../materialsProps";
import { useEffect, useState } from "react";
interface LastStockUpdate {
  changeAmount: number;
  changeDate: string;
  previousStock: number;
  material: MaterialProps;
  user: {
    email: string;
    username: string;
  };
}


const MaterialLogistics = ({
  materialToCheck,
}: {
  materialToCheck: MaterialProps | null;
}) => {
  const [storedMaterials, setStoredMaterials] = useState([]);
  const [error, setError] = useState("");
  const [lastStockUpdate, setLastStockUpdate] =
  useState<LastStockUpdate | null>(null);

  
  const getStoredMaterials = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/distribution-stock/material/${materialToCheck?.id}`
      );

      // Verificar si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.statusText);
      }

      const data = await response.json();
      setStoredMaterials(data); // Actualiza el estado con los datos recibidos
    } catch (error) {
      const errorMessage = (error as Error).message || "Error desconocido";
      setError(errorMessage); // Manejo de errores
    }
  };

  // Puedes usar useEffect para llamar a getStoredMaterials cuando el componente se monte o cuando materialToCheck cambie
  useEffect(() => {
    if (materialToCheck?.id) {
      getStoredMaterials();
    }
  }, [materialToCheck]);

  // const [stockMovements, setStockMovements] = useState<any[]>([]);
  // console.log("stockmovemeeeents ---->", stockMovements)
  //   const getLastActualization = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_BASE}/stockchange/material/${materialToCheck?.id}`
  //       );
  //       const data = await response.json();
  //       if (response.ok && data.length > 0) {
  //         setStockMovements(data); // Almacena todos los movimientos
  //       }
  //     } catch (e) {
  //       console.error("Error fetching data:", e);
  //     }
  //   };
  
  //   useEffect(() => {
  //     getLastActualization();
  //   }, [materialToCheck]);
  

console.log("lastagualization", lastStockUpdate)

  return (
    <Box sx={{ display: "flex", height: 400 }}>
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
            paddingInline: "24px",
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Logística del material
          </Typography>
        </Box>

        {/* Content Section */}

        <Box sx={{ bgcolor: theme.palette.secondary.light, p: "7px 24px" }}>
          <Typography sx={{ fontSize: "18px" }}>
           Stock total actual {materialToCheck?.actual_stock}
          </Typography>
        </Box>
        <Box sx={{}}>
   
          {storedMaterials && storedMaterials.length > 0 ? (
            storedMaterials.map((material, index) => (
              <Box
                key={material?.id}
                sx={{  }}
              >
                <Box sx={{ bgcolor: index % 2 === 1 ?"#f0f0f0" :  "#ffffff" }}>
                  <Box sx={{p:3, display:'flex', justifyContent:'space-between'}}>
                  <Typography variant="body1">
                 
                    {material?.storaged_stock} {material.material?.name}
                  </Typography>
                  <Typography variant="body1">
                    {material?.sector?.name}
                  </Typography>
                </Box></Box>
              </Box>
            ))
          ) : (
            <Box>
              {/* {stockMovements.map((movement, index) => (
              <Box key={movement.id}
              sx={{ bgcolor: index % 2 === 0 ? "#ffffff" : "#f0f0f0" ,display:'flex', justifyContent:'space-between',p:2}}>
                <Box sx={{display:'flex'}}>
                <Box >{movement.changeAmount}</Box> &nbsp; &nbsp;
                <Box >{movement.material.name}</Box></Box>
                <Box >{movement.sector?.name}</Box>
              </Box>
            ))}
                  */}
                  Aún no hay movimientos de stock 
           </Box>
          )}{" "}
        </Box>

        {/* {error && <Box sx={{ color: 'red', mt: 2 }}>{error}</Box>} */}
      </Box>
    </Box>
  );
};

export default MaterialLogistics;
