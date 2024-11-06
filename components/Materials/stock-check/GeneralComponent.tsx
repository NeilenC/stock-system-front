import { Box } from "@mui/material";
import { MaterialProps } from "../materialsProps";
import { useEffect, useState } from "react";
import { useMaterialStore } from "../../../zustand/materialStore";
import MaterialCalentarComponent from "../material-check/MaterialCalendarComponent";
import LastActualization from "./LastActualization";
import MaterialLogistics from "../material-check/MaterialLogistics";
import MaterialEditCheck from "../material-check/MaterialEditCheck";
import { toast, ToastContainer } from "react-toastify";
import Toast from "../../../commons/Toast";
import theme from "../../../themes/theme";

interface GeneralComponentProps {
  materialToCheck: MaterialProps | null;
}

const GeneralComponent: React.FC<GeneralComponentProps> = ({
  materialToCheck,
}) => {
  const { material } = useMaterialStore();
  const [materialState, setMaterialState] = useState<MaterialProps | null>(
    materialToCheck
  );
  const [originalMaterial, setOriginalMaterial] =
    useState<MaterialProps | null>(materialToCheck);
  const [showToast, setShowToast] = useState(false);
  const [toastProps, setToastProps] = useState({
    messageLeft: "",
    messageRight: "",
    bgcolor: theme.palette.success.light,
    color: "black",
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [stockAdjustmentType, setStockAdjustmentType] = useState<
    "add" | "remove" | null
  >(null);
  const [updatedMaterial, setUpdatedMaterial] = useState(materialToCheck);

  const showToastMessage = (
    messageLeft: string,
    messageRight: string,
    bgcolor: string,
    color: string
  ) => {
    setToastProps({ messageLeft, messageRight, bgcolor, color });
    setShowToast(true);
  };
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

      if (response.ok) {
        showToastMessage(
          "Material actualizado con éxito",
          "",
          theme.palette.success.light,
          "black"
        );
      }
    } catch (error) {
      console.error("Failed to update material:", error);
      showToastMessage(
        "Error al actualizar el material",
        "Intente de nuevo",
        theme.palette.error.light,
        "white"
      );
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
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            isStockModalOpen={isStockModalOpen}
            setIsStockModalOpen={setIsStockModalOpen}
            stockAdjustmentType={stockAdjustmentType}
            setStockAdjustmentType={setStockAdjustmentType}
            updatedMaterial={updatedMaterial}
            setUpdatedMaterial={setUpdatedMaterial}
          />
        </Box>
        <MaterialLogistics materialToCheck={materialToCheck} updatedMaterial={updatedMaterial ? updatedMaterial : null} />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", pl: 3 }}>
        <MaterialCalentarComponent text={"Próximo uso"} />
        <Box sx={{ pt: 2 }}>
          <LastActualization materialId={materialToCheck?.id ?? 0} updatedMaterial={updatedMaterial ? updatedMaterial : null}/>
        </Box>
      </Box>

      {showToast && (
        <Toast
          messageLeft={toastProps.messageLeft}
          messageRight={toastProps.messageRight}
          bgcolor={toastProps.bgcolor}
          color={toastProps.color}
          onClose={() => setShowToast(false)}
        />
      )}
    </Box>
  );
};

export default GeneralComponent;
