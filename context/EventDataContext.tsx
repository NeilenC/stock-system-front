import React, { createContext, ReactNode, useContext } from 'react';
import useEventStore, { EventData } from '../commons/activities-commons/DrawerBooking/activity-hook/useEventStore';

interface EventContextProps {
  eventData: EventData;
  setGeneralInfo: (key: keyof EventData["generalInfo"]["details"], value: string) => void;
  setLogisticsAssembly: (key: keyof EventData["logistics"]["assembly"], value: string) => void;
  setLogisticsDismantling: (key: keyof EventData["logistics"]["dismantling"], value: string) => void;
  setLogisticsDetails: (key: keyof EventData["logistics"]["detailsLogistics"], value: string | string[]) => void;
  setOperationalDetails: (key: keyof EventData["logistics"]["operationalDetails"]["information"], value: number | null) => void;
  setTicketOfficeDetails: (key: keyof EventData["logistics"]["operationalDetails"]["ticketOffice"], value: string | number) => void;
  setClientData: (key: keyof EventData["logistics"]["clientData"]["client"], value: number | string | null) => void;
  setOrganizerOrResponsible: (key: keyof EventData["logistics"]["clientData"]["organizerOrResponsible"], value: string | number) => void;
  setTechnicalDirector: (key: keyof EventData["logistics"]["clientData"]["technicalDirector"], value: string | number) => void;
  setAdministrator: (key: keyof EventData["logistics"]["clientData"]["administrator"], value: string | number) => void;
  setSectors: (sectors: { sector_id: number; is_partially_rented: boolean; square_meters_rented: number, toggle_partially_rented:boolean }[]) => void;
  resetForm: () => void;
}

// Crear el contexto con una función vacía por defecto
const EventContext = createContext<EventContextProps>({
  eventData: {} as EventData,
  setGeneralInfo: () => {},
  setLogisticsAssembly: () => {},
  setLogisticsDismantling: () => {},
  setLogisticsDetails: () => {},
  setOperationalDetails: () => {},
  setTicketOfficeDetails: () => {},
  setClientData: () => {},
  setOrganizerOrResponsible: () => {},
  setTechnicalDirector: () => {},
  setAdministrator: () => {},
  setSectors: () => [],
  resetForm: () => {},
});
interface EventDataProviderProps {
  children: ReactNode;
}
// Proveedor de contexto
export const EventProvider: React.FC<EventDataProviderProps> = ({ children }) => {
  const {
    eventData,
    setGeneralInfo,
    setLogisticsAssembly,
    setLogisticsDismantling,
    setLogisticsDetails,
    setOperationalDetails,
    setTicketOfficeDetails,
    setClientData,
    setOrganizerOrResponsible,
    setTechnicalDirector,
    setAdministrator,
    setSectors,
    resetForm,
  } = useEventStore();

  return (
    <EventContext.Provider
      value={{
        eventData,
        setGeneralInfo,
        setLogisticsAssembly,
        setLogisticsDismantling,
        setLogisticsDetails,
        setOperationalDetails,
        setTicketOfficeDetails,
        setClientData,
        setOrganizerOrResponsible,
        setTechnicalDirector,
        setAdministrator,
        setSectors,
        resetForm,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

// Hook para usar el contexto
export const useEventContext = () => {
  return useContext(EventContext);
};
