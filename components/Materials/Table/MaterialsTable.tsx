import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Filters from "./components/filters/Filters";
import TableHeader from "./TableHeader";
import TableRowItem from "./TableRowItem";
import Pagination from "./Pagination";
import ModalComponent from "../../../commons/modals/ModalComponent";
import MaterialEditForm from "../Modal/Forms/MaterialEditForm";
import useMaterialsFilter from "./Hooks/useMaterialsFilter";
import { MaterialProps } from "../materialsProps";
import MaterialDetails from "./components/MaterialDetails";
import { useMaterialStore } from "../../../zustand/materialStore";
import SectionComponent from "../../From-Nabvar/Navbar/Section-page/SectionComponent";
import CustomButton from "../../../commons/buttons-commons/CustomButton";
import CreateMaterialForm from "../Modal/CreateMaterialForm";
import { useMaterials } from "../../../MaterialsContex";
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
  observations: "",
  price: 0,
  is_active: true,
  category: 0,
  distribution_stock: [
    {
      sector_id: 0,     
      storaged_stock: 0, 
    },
]
};

const MaterialsTable = ({
  initialMaterials,
  openModalCreate, setOpenModalCreate
}: {
  initialMaterials: MaterialProps[];
  openModalCreate: boolean, setOpenModalCreate: any
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [materials, setMaterials] = useState<MaterialProps[]>(initialMaterials);
  const {  currentMaterials,
    handlePageChange,
    filteredMaterials,
    currentPage,handleFilter,
    itemsPerPage } = useMaterialsFilter(materials);
  const {addMaterial } = useMaterials();
    
    const { material } = useMaterialStore();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [materialId, setMaterialId] = useState<number | null>(null);
  const [selectedMaterial, setSelectedMaterial] =
    useState<MaterialProps | null>(null); // Estado para el material seleccionado
  
  const fetchMaterials = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/materials/isActive`);
      const data = await response.json();

      setMaterials(data);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    }
  };
  useEffect(() => {

    fetchMaterials();
  }, []); 


  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
  };
  
  

  const handleEdit = (materialId: number) => {
    setMaterialId(materialId);
    setSelectedMaterial(material); // Establecer el material seleccionado

    setIsEditModalOpen(true);
  };

  const handleDelete = (material: any) => {
    setMaterialId(material.id);
    setSelectedMaterial(material); 
    setIsDeleteModalOpen(true); 
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedMaterial(null); // Limpiar el material seleccionado al cerrar el modal
  };

  const handleDeleteConfirm = async () => {
    if (!materialId) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials/${materialId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_active: false }), // Cambiar is_active a false
        }
      );

      if (!response.ok) {
        throw new Error("Error updating material");
      }

      setIsDeleteModalOpen(false);
      setSelectedMaterial(null); // Limpiar el material seleccionado al confirmar eliminación}7
      await fetchMaterials();
      // Aquí podrías llamar a una función para volver a obtener los materiales actualizados
    } catch (error) {
      console.error("Failed to update material:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (!selectedMaterial || !materialId) {
        console.error("Material or Material ID is missing");
        return;
      }

      const { category, ...rest } = material; // Desestructuramos el material
      const updatedMaterial = {
        ...rest,
        category: category?.id, // Asumiendo que el campo en el servidor se llama categoryId
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials/${materialId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMaterial), // Convertimos el objeto material a JSON
        }
      );

      if (!response.ok) {
        throw new Error("Error updating material");
      }

      const updatedMaterialsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials/isActive`
      );
      const updatedMaterials = await updatedMaterialsResponse.json();

      // Actualizamos el estado con los materiales obtenidos
      setMaterials(updatedMaterials);
      setIsEditModalOpen(false); // Cierra el modal
    } catch (error) {
      console.error("Failed to update material:", error);
    }
  };



  const handleCreateMaterial = async (formData: any) => {
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials/create`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      if (response.ok) {
        toast.success("Material creado exitosamente");
        setOpenModalCreate(false);
        addMaterial(formData);
        // setNewMaterial()
        setFormData(initialFormData);
         await fetchMaterials()
      } else {
        const errorResponse = await response.json();
        toast.error(`Error al crear el material: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error("Error creando material:", error);
      toast.error("Error creando material.");
    }
  };
  

console.log("formda...", formData)
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  console.log("name, value", name, value);

  setFormData((prev) => {
    if (name.startsWith("distribution_stock.")) {
      const index = 0; // Suponiendo que solo tienes un objeto en el array
      const fieldName = name.split(".")[1]; // Obtiene el nombre del campo

      return {
        ...prev,
        distribution_stock: prev.distribution_stock.map((item, idx) => {
          if (idx === index) {
            return {
              ...item,
              [fieldName]: fieldName === 'sector_id' ? Number(value) : value, // Actualiza solo el campo específico
            };
          }
          return item; // Retorna el item sin cambios
        }),
      };
    }

    // Manejo del cambio de category y otros campos
    return {
      ...prev,
      [name]: name === "category" ? Number(value) : value,
    };
  });
};

  

  const handleFileChange = (e:any) => {
    if (e.target.files) {
      setFormData({ ...formData, image_url: e.target.files[0] });
    }
  };

  return (
    <>
     
      <Box sx={{ pb: 2 }}>
        <Grid container>
          <TableHeader />
          <Filters onFilter={handleFilter} />

          <Box sx={{ height: "460px", overflowY: "auto", width: "100%" }}>
            {currentMaterials.map((material: MaterialProps, index) => (
              <TableRowItem
                key={material.id}
                material={material}
                index={index}
                onEdit={handleEdit}
                openDeleteModal={() => handleDelete(material)} 
              />
            ))}
          </Box>
        </Grid>

        <Pagination
          page={currentPage}
          onPageChange={handlePageChange}
          totalItems={filteredMaterials.length}
          itemsPerPage={itemsPerPage}
        />

        {isEditModalOpen && (
          <ModalComponent
            isOpen={isEditModalOpen}
            handleClose={handleModalClose}
            title="Editar Material"
            onSubmit={handleSave}
            textButton='Editar'
          >
            <MaterialEditForm materialId={materialId} />
          </ModalComponent>
        )}

        {isDeleteModalOpen && (
          <ModalComponent
            isOpen={isDeleteModalOpen}
            handleClose={handleDeleteModalClose}
            onSubmit={handleDeleteConfirm}
            title={`¿ Deseas eliminar el material ${selectedMaterial?.name} ?`}
            fromDelete={true}
            textButton="Eliminar"
          >
            {selectedMaterial && (
              <MaterialDetails material={selectedMaterial} />
            )}
          </ModalComponent>
        )}
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
      </Box>
    </>
  );
};

export default MaterialsTable;
