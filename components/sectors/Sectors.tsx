import { Box } from "@mui/material";
import { useRef, useState } from "react";
import useSectors from "../../hooks/useSectors"; // Hook para obtener sectores
import { useSectorPositions } from "../../context/SectorPositionsProvider";
import Category from "./Category";
import { groupSectorsByCategory } from "./functions";
import ModalComponent from "../../commons/modals/ModalComponent";
import { useSectorStore } from "../../zustand/sectorsStore";
import SectorEditForm from "./forms/SectorFormEdit";
import Toast from "../../commons/Toast";
import theme from "../../themes/theme";

const Sectors = ({ salas = [], setSalas }: { salas: any[] , setSalas:any}) => {
  const { sectorData } = useSectorStore();
  const { sectorPositions, setSectorPositions } = useSectorPositions();
  const sectorRefs = useRef<{ [sectorId: number]: HTMLDivElement | null }>({});
  const groupedSectors = groupSectorsByCategory(salas);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSectorId, setEditingSectorId] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastProps, setToastProps] = useState({
    messageLeft: "",
    messageRight: "",
    bgcolor: theme.palette.success.light,
    color: "black",
  });

  const showToastMessage = (messageLeft:string, messageRight:string, bgcolor:string, color:string) => {
    setToastProps({ messageLeft, messageRight, bgcolor, color });
    setShowToast(true);
  };
  const handleEditSector = (sectorId: number) => {
    setEditingSectorId(sectorId);
    setIsEditModalOpen(true);
  };
  
  const handleUpdateSector = async () => {
    if (editingSectorId) {
      try {
        const formattedSectorData = {
          ...sectorData,
          square_meters: Number(sectorData.square_meters),
          // number_of_bathrooms: Number(sectorData.number_of_bathrooms),
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/sectors/${editingSectorId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedSectorData),
        });

        if (!response.ok) {
          throw new Error(`Failed to update sector: ${response.statusText}`);
        }

        setSalas((prevSalas:any) => 
          prevSalas.map((sector:any) =>
            sector.id === editingSectorId ? { ...sector, ...formattedSectorData } : sector
          )
        );

        setIsEditModalOpen(false);
        setEditingSectorId(null);
        showToastMessage(
          "Sector actualizado con éxito",
          "",
          theme.palette.success.light,
          "white"
        );
      } catch (error) {
        console.error("Error updating sector:", error);
        showToastMessage(
          "Error al actualizar el sector. Intente nuevamente",
          "Intente de nuevo",
          theme.palette.error.light,
          "black"
        );
      }
    }
  };
  console.log("sectorData", sectorData)
  const handleDeleteSector = async (sectorId: number) => {
    try {
      // Realiza la solicitud PATCH para actualizar el sector a inactivo
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/sectors/${sectorId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ is_active: false }), 
        }
      );
  
      if (!response.ok) {
        // Analizar el error devuelto por el backend
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete sector');
      }
  
      // Actualiza el estado local para reflejar la eliminación
      setSalas((prevSalas: any) => prevSalas.filter((sector: any) => sector.id !== sectorId));
      showToastMessage(
        'Sector eliminado con éxito',
        '',
        theme.palette.success.light,
        'white'
      );
    } catch (error: any) {
      if (error.message.includes('associated')) {
        showToastMessage(
            'No se puede desactivar el sector porque tiene asociaciones.',
            'Elimina las relaciones antes de continuar.',
            theme.palette.error.light,
            'black'
        );
    } else {
        showToastMessage(
            'Error al desactivar el sector. Intente nuevamente',
            'Intente de nuevo',
            theme.palette.error.light,
            'black'
        );
    }
    }
  };
  


  return (
    <Box>
      <Box sx={{ minWidth: "310px" }}>
        {Object.keys(groupedSectors).map((category) => (
          <Category
            key={category}
            category={category}
            sectors={groupedSectors[category]}
            sectorRefs={sectorRefs}
            sectorPositions={sectorPositions}
            setSectorPositions={setSectorPositions}
            onEditSector={handleEditSector}
            onDelete={handleDeleteSector}
          />
        ))}
      </Box>
      {isEditModalOpen && (
        <ModalComponent
          isOpen={isEditModalOpen ?? false}
          handleClose={() => setIsEditModalOpen(false)}
          title="Editar Espacio"
          onSubmit={handleUpdateSector}
          textButton="Editar"
        >
          <SectorEditForm
            sectorId={editingSectorId}
            handleClose={() => {
              setIsEditModalOpen(false);
              setEditingSectorId(null);
            }}
            onSubmit={handleUpdateSector} 
          />
        </ModalComponent>
      )}
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

export default Sectors;
