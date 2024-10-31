import { Box } from "@mui/material";

import { MaterialProps } from "../materialsProps";

import { useEffect, useState } from "react";
import { useMaterialStore } from "../../../zustand/materialStore";

import MaterialCalentarComponent from "../material-check/MaterialCalendarComponent";
import LastActualization from "./LastActualization";
import MaterialLogistics from "../material-check/MaterialLogistics";
import MaterialEditCheck from "../material-check/MaterialEditCheck";
// import MaterialCalentarComponent from "../material-check/MaterialCalendarComponent";

interface GeneralComponentProps {
  materialToCheck: MaterialProps | null;
}
const GeneralComponent: React.FC<GeneralComponentProps> = ({
  materialToCheck,
}) => {
  console.log("material", materialToCheck);

  const { material } = useMaterialStore();

  const [materialState, setMaterialState] = useState<MaterialProps | null>(
    materialToCheck
  );
  const [originalMaterial, setOriginalMaterial] =
    useState<MaterialProps | null>(materialToCheck);

  useEffect(() => {
    setMaterialState(material);
    setOriginalMaterial(material);
  }, [material]);

  const handleSave = async () => {
    try {
      if (!materialToCheck?.id) {
        console.error("Material or Material ID is missing");
        return;
      }

      const { category, ...rest } = material; 
      const updatedMaterial = {
        ...rest,
        category: category?.id, 
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials/${material.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMaterial), 
        }
      );

      if (!response.ok) {
        throw new Error("Error updating material");
      }

    } catch (error) {
      console.error("Failed to update material:", error);
    }
  };

  const handleCancel = () => {
    setMaterialState(originalMaterial); // Restaura los valores iniciales
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{}}>
          <MaterialEditCheck
            materialToCheck={materialToCheck}
            handleCancel={handleCancel}
            handleSave={handleSave}
          />
        </Box>
        <MaterialLogistics />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", pl: 3 }}>
        <MaterialCalentarComponent text={"Próximo uso"} />
        <Box sx={{ pt: 2 }}>
          <LastActualization materialId={materialToCheck?.id ?? 0} />
        </Box>
      </Box>
    </Box>
  );
};

export default GeneralComponent;
