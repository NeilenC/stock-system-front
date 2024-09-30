    import React, { createContext, useContext, useState, ReactNode } from "react";

    // Define la interfaz para el contexto
    interface SectorPositionsContextType {
    sectorPositions: { [sectorId: number]: number }; // Posiciones de los sectores
    setSectorPositions: React.Dispatch<React.SetStateAction<{ [sectorId: number]: number }>>; // Función para actualizar las posiciones
    }

    // Crear el contexto
    const SectorPositionsContext = createContext<SectorPositionsContextType | undefined>(undefined);

    // Custom hook para usar el SectorPositionsContext
    export const useSectorPositions = () => {
    const context = useContext(SectorPositionsContext);
    if (!context) {
        throw new Error("useSectorPositions must be used within a SectorPositionsProvider");
    }
    return context;
    };

    // Proveedor del contexto
    interface SectorPositionsProviderProps {
    children: ReactNode; // Propiedad para los elementos hijos
    }

    export const SectorPositionsProvider: React.FC<SectorPositionsProviderProps> = ({ children }) => {
    const [sectorPositions, setSectorPositions] = useState<{ [sectorId: number]: number }>({}); // Estado inicial

    return (
        <SectorPositionsContext.Provider value={{ sectorPositions, setSectorPositions }}>
        {children} {/* Renderizar los componentes hijos */}
        </SectorPositionsContext.Provider>
    );
    };
