import { useEffect, useState } from "react";
import CustomButton from "../../../commons/buttons-commons/CustomButton";
import SectionComponent from "../../From-Nabvar/Navbar/Section-page/SectionComponent";
import materialsicon from "../../../public/materials.png";
import { Box } from "@mui/material";
import { MaterialProps } from "../materialsProps";
import MaterialsTable from "./MaterialsTable";
import useFilters from "./Hooks/useFilters";
import ModalComponent from "../../../commons/modals/ModalComponent";
import CreateMaterialForm from "../Modal/CreateMaterialForm";
import { toast } from "react-toastify";

const initialFormData = {
  name: "",
  description: "",
  code: "",
  color: "",
  image_url: null,
  weight: 0,
  width: 0,
  depth: 0,
  height: 0,
  actual_stock: 0,
  observations: "",
  price: 0,
  is_active: true,
  category: 0,
};
const MainComponent = () => {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [materials, setMaterials] = useState<MaterialProps[]>([]);
  const [formData, setFormData] = useState(initialFormData);
  
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/materials/isActive`
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error("Failed to fetch materials:", error);
      }
    };
  
    fetchMaterials();
  }, []);
  
  
  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
  };
  console.log("cleanedFormData",  formData.weight)

  const handleCreateMaterial = async (formData: any) => {
    // Validar y limpiar los datos antes de enviarlos
    const cleanedFormData = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = typeof value === 'number' ? value || 0 : value || "";
      return acc;
    }, {} as typeof formData);
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cleanedFormData),
        }
      );
  
      if (response.ok) {
        toast.success("Material creado exitosamente");
        setOpenModalCreate(false);
        setMaterials((prev) => [ ...prev,cleanedFormData]);
        setFormData(initialFormData);
      } else {
        const errorResponse = await response.json();
        toast.error(`Error al crear el material: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error("Error creando material:", error);
      toast.error("Error creando material.");
    }
  };
  


  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "category" ? Number(value) : value,
    }));
  };
  

  const handleFileChange = (e:any) => {
    if (e.target.files) {
      setFormData({ ...formData, image_url: e.target.files[0] });
    }
  };

  return (
    <>
      <SectionComponent icon={materialsicon} text={"Materiales"}>
        <Box display={"flex"} gap={2}>
          <CustomButton
            onClick={handleOpenModalCreate}
            text={"Crear Material"}
          />
          {/* <CustomButton onClick={clearFilters} text={"Limpiar Filtros"} /> */}
        </Box>
      </SectionComponent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Centra horizontalmente
          alignItems: "center", // Centra verticalmente
          paddingBlock: "16px",
          paddingInline: "16px",
        }}
      >
        <Box
          sx={{
            borderRadius: "16px",
            border: "1px solid #E2E8F0",
            overflow: "hidden",
          }}
        >
          <MaterialsTable initialMaterials={materials} />
        </Box>
      </Box>
      {openModalCreate && (
        <ModalComponent
          isOpen={openModalCreate}
          handleClose={handleCloseModalCreate}
          title="Crear Material"
          onSubmit={() => handleCreateMaterial(formData)}
          textButton="Guardar"
        >
          <CreateMaterialForm 
           formData={formData}
           handleChange={handleChange}
           handleFileChange={handleFileChange} />
        </ModalComponent>
      )}
    </>
  );
};

export default MainComponent;
