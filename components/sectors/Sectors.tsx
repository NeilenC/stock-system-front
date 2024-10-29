import { Box } from "@mui/material";
import { useRef, useState } from "react";
import useSectors from "../../hooks/useSectors"; // Hook para obtener sectores
import { useSectorPositions } from "../../context/SectorPositionsProvider";
import Category from "./Category";
import { groupSectorsByCategory } from "./functions";
import ModalComponent from "../../commons/modals/ModalComponent";
import { useSectorStore } from "../../zustand/sectorsStore";
import SectorEditForm from "./forms/SectorFormEdit";

const Sectors = () => {
  const { salas, setSalas } = useSectors(); // Asegúrate de tener una función para setear las salas
  const { sectorData } = useSectorStore();

  const { sectorPositions, setSectorPositions } = useSectorPositions();
  const sectorRefs = useRef<{ [sectorId: number]: HTMLDivElement | null }>({});
  const groupedSectors = groupSectorsByCategory(salas);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSectorId, setEditingSectorId] = useState<number | null>(null);

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
          number_of_bathrooms: Number(sectorData.number_of_bathrooms),
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

        // Actualiza el estado local para reflejar los cambios instantáneamente
        setSalas((prevSalas: any) => {
          return prevSalas.map((sector:any) =>
            sector.id === editingSectorId ? { ...sector, ...formattedSectorData } : sector
          );
        });

        setIsEditModalOpen(false);
        setEditingSectorId(null);
      } catch (error) {
        console.error("Error updating sector:", error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ minWidth: "310px", overflow: "auto" }}>
        {Object.keys(groupedSectors).map((category) => (
          <Category
            key={category}
            category={category}
            sectors={groupedSectors[category]}
            sectorRefs={sectorRefs}
            sectorPositions={sectorPositions}
            setSectorPositions={setSectorPositions}
            onEditSector={handleEditSector}
          />
        ))}
      </Box>
      {isEditModalOpen && (
        <ModalComponent
          isOpen={isEditModalOpen}
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
    </Box>
  );
};

export default Sectors;
