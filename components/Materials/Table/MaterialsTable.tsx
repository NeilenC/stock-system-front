import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Filters from "./components/filters/Filters";
import TableHeader from "./TableHeader";
import TableRowItem from "./TableRowItem";
import Pagination from "./Pagination";
import ModalComponent from "../../../commons/modals/ModalComponent";
import MaterialEditForm from "../Modal/Forms/MaterialEditForm";
import useMaterialsFilter from "./Hooks/useMaterialsFilter";
import usePagination from "./Hooks/usePagination";
import { MaterialProps } from "../materialsProps";
import MaterialDetails from "./components/MaterialDetails";
import { useMaterialStore } from "../../../zustand/materialStore";
import { CustomTextFieldMaterial } from "../StyledMaterial";
import { Button } from "rsuite";

const MaterialsTable = ({
  initialMaterials,
}: {
  initialMaterials: MaterialProps[];
}) => {

  const [materials, setMaterials] = useState<MaterialProps[]>(initialMaterials);
  const {  currentMaterials,
  handlePageChange,
  filteredMaterials,
  currentPage,handleFilter,
  itemsPerPage } = useMaterialsFilter(materials);

  const { material } = useMaterialStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [materialId, setMaterialId] = useState<number | null>(null);
  const [selectedMaterial, setSelectedMaterial] =
    useState<MaterialProps | null>(null); // Estado para el material seleccionado
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [stockAdjustment, setStockAdjustment] = useState(0); // Para almacenar la cantidad a sumar/restar

  const fetchMaterials = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/materials`);
      const data = await response.json();
      const activeMaterials = data.filter((material: MaterialProps) => material.is_active);

      setMaterials(activeMaterials);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    }
  };
  useEffect(() => {

    fetchMaterials();
  }, []); 


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
console.log("materialid", materialId)
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
        `${process.env.NEXT_PUBLIC_API_BASE}/materials`
      );
      const updatedMaterials = await updatedMaterialsResponse.json();

      // Actualizamos el estado con los materiales obtenidos
      setMaterials(updatedMaterials);
      setIsEditModalOpen(false); // Cierra el modal
    } catch (error) {
      console.error("Failed to update material:", error);
    }
  };

  const handleStockAdjustmentConfirm = async () => {
    if (!materialId || stockAdjustment === 0) return; // Asegúrate de que hay un ID de material y una cantidad válida

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials/${materialId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stock: stockAdjustment }), // Puedes ajustar esto según cómo manejes el stock
        }
      );

      if (!response.ok) {
        throw new Error("Error updating stock");
      }

      // Actualizar el stock en el estado
      setStockAdjustment(0); // Reinicia el ajuste
      setIsStockModalOpen(false); // Cierra el modal
      // Aquí puedes volver a cargar los materiales si es necesario
      const updatedMaterialsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/materials`
      );
      const updatedMaterials = await updatedMaterialsResponse.json();
    } catch (error) {
      console.error("Failed to update stock:", error);
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
                openDeleteModal={() => handleDelete(material)} // Pasa el material a la función de eliminación
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

        {isStockModalOpen && (
          <ModalComponent
            isOpen={isStockModalOpen}
            handleClose={() => setIsStockModalOpen(false)}
            title={`Ajustar stock para ${selectedMaterial?.name}`}
            onSubmit={handleStockAdjustmentConfirm}
          >
            <CustomTextFieldMaterial
              label="Cantidad"
              type="number"
              value={stockAdjustment}
              onChange={(e) => setStockAdjustment(Number(e.target.value))} // Asegúrate de convertir a número
              fullWidth
            />
            <div>
              <Button onClick={() => setStockAdjustment(stockAdjustment + 1)}>
                Sumar
              </Button>
              <Button onClick={() => setStockAdjustment(stockAdjustment - 1)}>
                Restar
              </Button>
            </div>
          </ModalComponent>
        )}
      </Box>
    </>
  );
};

export default MaterialsTable;

// import React, { useState, useEffect } from "react";
// import { Grid, Box } from "@mui/material";
// import Filters from "./components/filters/Filters";
// import TableHeader from "./TableHeader";
// import TableRowItem from "./TableRowItem";
// import Pagination from "./Pagination";
// import ModalComponent from "../../../commons/modals/ModalComponent";
// import MaterialEditForm from "../Modal/Forms/MaterialEditForm";
// import useMaterialsFilter from "./Hooks/useMaterialsFilter";
// import { MaterialProps } from "../materialsProps";
// import { useMaterialStore } from "../../../zustand/materialStore";

// const MaterialsTable = ({ materials: initialMaterials }: any) => {
//   const [materials, setMaterials] = useState<MaterialProps[]>(initialMaterials); // Estado local para los materiales
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [materialId, setMaterialId] = useState<number | null>(null);
//   const [openDeleteModal, setOpenDeleteModal] = useState(false)
//   const { material } = useMaterialStore();
//   const {
//     currentMaterials,
//     handlePageChange,
//     filteredMaterials,
//     handleFilter,
//     currentPage,
//     itemsPerPage,
//   } = useMaterialsFilter(materials);

//   // Efecto para sincronizar el estado local con las props iniciales
// //   useEffect(() => {
// //     setMaterials(initialMaterials);
// //   }, [initialMaterials]);

//   const handleEdit = (materialId: number) => {
//     setMaterialId(materialId);
//     setIsEditModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsEditModalOpen(false);
//   };

//   const handleOpenModal = () => {
//     setOpenDeleteModal(true)
//   }

//   const handleSave = async () => {
//     try {
//       if (!material || !materialId) {
//         console.error("Material or Material ID is missing");
//         return;
//       }
//       const { category, ...rest } = material; // Desestructuramos el material
//       const updatedMaterial = {
//         ...rest,
//         category: category?.id, // Asumiendo que el campo en el servidor se llama categoryId
//       };
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE}/materials/${materialId}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedMaterial), // Convertimos el objeto material a JSON
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Error updating material");
//       }

//       // Material actualizado con éxito, ahora hacemos un nuevo fetch de todos los materiales
//       const updatedMaterialsResponse = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE}/materials`
//       );
//       const updatedMaterials = await updatedMaterialsResponse.json();

//       // Actualizamos el estado con los materiales obtenidos
//       setMaterials(updatedMaterials);
//       setIsEditModalOpen(false); // Cierra el modal
//     } catch (error) {
//       console.error("Failed to update material:", error);
//     }
//   };

//   return (
//     <>
//       <Box sx={{ pb: 2 }}>
//         <Grid container>
//           <TableHeader />
//           <Filters onFilter={handleFilter} />

//           <Box sx={{ height: "660px", overflowY: "auto", width: "100%" }}>
//             {currentMaterials.map((material: any, index) => (
//               <TableRowItem
//                 key={material.id}
//                 material={material}
//                 index={index}
//                 onEdit={handleEdit}
//                 openDeleteModal={handleOpenModal}
//               />
//             ))}
//           </Box>
//         </Grid>

//         <Pagination
//           page={currentPage}
//           onPageChange={handlePageChange}
//           totalItems={filteredMaterials.length}
//           itemsPerPage={itemsPerPage}
//         />

//         {isEditModalOpen && (
//           <ModalComponent
//             isOpen={isEditModalOpen}
//             handleClose={handleModalClose}
//             title="Editar Material"
//             onSubmit={handleSave}
//           >
//             <MaterialEditForm
//               materialId={materialId}
//             />
//           </ModalComponent>
//         )}
//       </Box>
//     </>
//   );
// };

// export default MaterialsTable;
