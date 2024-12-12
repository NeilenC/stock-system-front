import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import useEventStore, { EventData } from '../activity-hook/useEventStore';

interface ValidationContextProps {
  errors: Record<string, string>;
  eventData: any; // Definir tipo adecuado para eventData
  handleInputChange: (key: string, value: string) => void;
  validateDates: (keyDate: string, date: Date) => boolean;
  handleDateChange: (keyDate: any, keyTime: any | null, date: Date | null) => void;
}

const EventValidationContext = createContext<ValidationContextProps | undefined>(undefined);

interface EventValidationProviderProps {
  children: ReactNode;
}

export const EventValidationProvider: React.FC<EventValidationProviderProps> = ({ children }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { eventData, setGeneralInfo } = useEventStore();

  const validateDates = useCallback((keyDate: any, date: Date): boolean => {
    const { initialDate, openingDate, closingDate, endDate } = eventData.generalInfo.details;

    // Convertir todas las fechas a objetos Date válidos
    const dateOrder: Record<string, Date | null> = {
      initialDate: initialDate ? new Date(initialDate) : null,
      openingDate: openingDate ? new Date(openingDate) : null,
      closingDate: closingDate ? new Date(closingDate) : null,
      endDate: endDate ? new Date(endDate) : null,
    };

    // Actualizar la fecha que está siendo cambiada
    dateOrder[keyDate] = date;

    // Verificar todas las condiciones de orden:
    if (
      dateOrder.initialDate &&
      dateOrder.openingDate &&
      dateOrder.initialDate > dateOrder.openingDate
    ) {
      return false;
    }

    if (
      dateOrder.openingDate &&
      dateOrder.closingDate &&
      dateOrder.openingDate > dateOrder.closingDate
    ) {
      return false;
    }

    if (
      dateOrder.closingDate &&
      dateOrder.endDate &&
      dateOrder.closingDate > dateOrder.endDate
    ) {
      return false;
    }

    
    if (
        dateOrder.initialDate &&
        dateOrder.closingDate &&
        dateOrder.initialDate > dateOrder.closingDate
      ) {
        return false;
      }

    if (
      dateOrder.closingDate &&
      dateOrder.openingDate &&
      dateOrder.closingDate < dateOrder.openingDate
    ) {
      return false;
    }

    return true;
  }, [eventData]);

  const handleDateChange = (keyDate:any, keyTime:any | null, date: Date | null) => {
    if (date && !isNaN(date.getTime())) {
      const isValid = validateDates(keyDate, date);
      if (isValid ) {
        setErrors((prevErrors) => ({ ...prevErrors, [keyDate]: "" }));
        handleInputChange(keyDate, date.toISOString().split("T")[0]);
        if(keyTime) {

            handleInputChange(keyTime, date.toTimeString().split(" ")[0].substring(0, 5));
        }
      } else {
        const errorMessage = `La fecha es inválida. Verifique el orden de las fechas.`;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [keyDate]: errorMessage,
        }));
      }
    } else {
      // Si la fecha es null o "" se borra el error
      setErrors((prevErrors) => ({
        ...prevErrors,
        [keyDate]: "",
      }));
    }
  };
  
  const handleInputChange = (key: keyof EventData["generalInfo"]["details"], value: string) => {
    setGeneralInfo(key, value);
  };
  

  return (
    <EventValidationContext.Provider value={{ errors, eventData, validateDates, handleInputChange, handleDateChange }}>
      {children}
    </EventValidationContext.Provider>
  );
};

// Hook para acceder al contexto
export const useEventValidation = () => {
  const context = useContext(EventValidationContext);
  if (!context) {
    throw new Error('useEventValidation debe ser utilizado dentro de un EventValidationProvider');
  }
  return context;
};
