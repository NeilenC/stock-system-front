import { Box } from "@mui/material";
import { useRef, useState } from "react";
import useSectors from "../../hooks/useSectors";
import { useSectorPositions } from "../../context/SectorPositionsProvider";
import Category from "./Category";
import { groupSectorsByCategory } from "./functions";
import ModalComponent from "../../commons/modals/ModalComponent";
import SectorEditForm from "./SectorFormEdit";

const Sectors = ({onSubmit}: {onSubmit: (formData:any) => Promise<void>}) => {
  const { salas } = useSectors();
  const { sectorPositions, setSectorPositions } = useSectorPositions();
  const sectorRefs = useRef<{ [sectorId: number]: HTMLDivElement | null }>({});
  const groupedSectors = groupSectorsByCategory(salas);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSectorId, setEditingSectorId] = useState<number | null>(null);

  const handleEditSector = (sectorId: number) => {
    setEditingSectorId(sectorId);
    setIsEditModalOpen(true);
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
        >
          <SectorEditForm
            sectorId={editingSectorId}
            handleClose={() => {
              setIsEditModalOpen(false);
              setEditingSectorId(null);
            }}
            onSubmit={onSubmit}
          />
        </ModalComponent>
      )}
    </Box>
  );
};

export default Sectors;
