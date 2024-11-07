import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionComponent from "../../../../components/From-Nabvar/Navbar/Section-page/SectionComponent";
import { Box } from "@mui/material";
import backicon from "../../../../public/image.png";
import TabComponent from "../../../../components/Materials/stock-check/TabComponent";
import theme from "../../../../themes/theme";
import { useMaterialStore } from "../../../../zustand/materialStore";
import { MaterialProps } from "../../../../components/Materials/materialsProps";
import GeneralComponent from "../../../../components/Materials/stock-check/GeneralComponent";
import StockMovemments from "../../../../components/Materials/stock-check/StockMovemments";
import { useRouter } from "next/router";

const MaterialMovements = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedTab, setSelectedTab] = useState(0);
  const [material, setMaterial] = useState<MaterialProps | null>(null);

  const fetchMaterialData = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials/${id}`
      );
      if (!response.ok) {
        throw new Error("Error fetching material data");
      }
      const data = await response.json();
      setMaterial(data);
    } catch (error) {
      console.error("Failed to fetch material data:", error);
    }
  };
  useEffect(() => {
    fetchMaterialData(Number(id));
  }, []);

  return (
    <>
      <Box sx={{ bgcolor: theme.palette.primary.light }}>
        <SectionComponent
          icon={backicon}
          text={`${material?.name}`}
          isId={true}
        />

        <Box
          sx={{
            position: "absolute", // Hace que TabComponent se superponga
            top: "135px", // Ajusta este valor para controlar la superposición
            width: 1,
            bgcolor: theme.palette.primary.main,
            zIndex: 1, // Asegura que el TabComponent esté encima del SectionComponent
          }}
        >
          <TabComponent
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </Box>

        {/* Renderiza el contenido de cada pestaña */}
        <Box
          sx={{
            paddingInline: {
              xs: "135px", // Para pantallas pequeñas (por defecto)
              lg: "250px", // Para pantallas grandes (monitores)
            },
            marginTop: "55px",
          }}
        >
          {" "}
          {/* Ajusta el margen para el contenido debajo de las pestañas */}
          {selectedTab === 0 && <GeneralComponent materialToCheck={material} />}
          {selectedTab === 1 && (
            <Box sx={{ height: "100vh" }}>
              <StockMovemments materialId={material?.id ?? 0} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default MaterialMovements;
